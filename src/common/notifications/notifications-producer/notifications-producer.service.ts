import { Injectable, Inject, Logger } from '@nestjs/common';
import * as amqp from "amqplib";
import { EXCHANGE_NAME } from '../constants';

export enum ExchangeType {
    Topic = "topic"
}

export type NotificationEventType = "add" | "update" | "delete";
export type NotificationEventResourceType = "orders";

export class NotificationEvent {
    type: NotificationEventType;
    resourceType: NotificationEventResourceType;
    message: any;
}


@Injectable()
export class NotificationsProducerService {
    private readonly exchangeType: ExchangeType = ExchangeType.Topic;
    private readonly exchangeName: string = EXCHANGE_NAME;
    private readonly logger = new Logger();

    constructor(@Inject("QueueConnection") private readonly connection: amqp.Connection) { }

    private async getChannelConnectedToExchange() {
        const channel = await this.connection.createChannel();
        await channel.assertExchange(this.exchangeName, this.exchangeType, { durable: false });
        return channel;
    }

    public async publish(event: NotificationEvent) {
        const channel = await this.getChannelConnectedToExchange();
        const routingKey = `${event.resourceType}.${event.type}`;
        try {
            channel.publish(this.exchangeName, routingKey, new Buffer(JSON.stringify(event.message)));
            this.logger.log(`Published on '${this.exchangeName}' in topic '${routingKey}', objectId: ${event.message.id}`, this.constructor.name);
        } catch (error) {
            this.logger.error(error.message, error.stack, this.constructor.name);
        }
    }
}
