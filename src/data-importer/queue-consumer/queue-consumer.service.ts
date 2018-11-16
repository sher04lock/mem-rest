import { Injectable, Inject, Logger } from '@nestjs/common';
import * as amqp from "amqplib";
import { validate } from 'class-validator';
import { OrderModel } from '../../orders/order';
import { OrdersService } from '../../orders/orders.service';

const IMPORT_QUEUE = "data_import";

export class OrderValidationError extends Error { }

@Injectable()
export class QueueConsumerService {
    private readonly logger = new Logger(this.constructor.name);

    constructor(
        @Inject("QueueConnection") private readonly connection: amqp.Connection,
        private readonly orderService: OrdersService
    ) {
        this.startListening();
    }

    private async startListening() {
        const channel = await this.connection.createChannel();
        const q = await channel.assertQueue(IMPORT_QUEUE, { durable: true });
        this.logger.log(`Data import consumer listening on queue '${IMPORT_QUEUE}'`);

        await channel.consume(q.queue, async msg => {
            try {
                await this.processMessage(msg.content);
            } catch (error) {
                if (error instanceof OrderValidationError) {
                    this.logger.warn("Incoming object is not valid, skipping.");
                } else {
                    this.logger.error(`Unable to import data: ${error.message}`);
                }
            } finally {
                await channel.ack(msg);
            }
        }, { noAck: false })
    }

    private async processMessage(content: Buffer) {
        let orders: OrderModel[] = JSON.parse(content.toString());

        if (!Array.isArray(orders)) {
            orders = [orders];
        }

        for (const order of orders) {
            await this.validateIncomingOrder(order);
            const createdOrder = await this.orderService.create(order);
            this.logger.log(`Imported order "${createdOrder.id}"`);
        }
    }

    private async validateIncomingOrder(order: OrderModel) {
        const validationErrors = await validate(order);
        if (validationErrors.length > 0) {
            throw new OrderValidationError();
        }

        return true;
    }
}
