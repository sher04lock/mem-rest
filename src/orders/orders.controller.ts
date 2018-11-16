import { Controller, Get, Post, Param, Body, Put, Delete, Logger } from '@nestjs/common';
import { OrderModel } from './order';
import { OrdersService } from './orders.service';
import { NotificationsProducerService, NotificationEventType } from '../common/notifications/notifications-producer/notifications-producer.service';

@Controller('orders')
export class OrdersController {
    private readonly logger = new Logger();

    constructor(
        private readonly ordersService: OrdersService,
        private readonly notificationPublisher: NotificationsProducerService
    ) { }

    @Get()
    getAll() {
        this.logger.log("/GET", this.constructor.name);
        return this.ordersService.getAll();
    }

    @Get(":id")
    getById(@Param("id") id) {
        this.logger.log(`/GET/${id}`, this.constructor.name);
        return this.ordersService.getById(id);
    }

    @Post()
    async create(@Body() order: OrderModel) {
        this.logger.log(`/POST`, this.constructor.name);
        const createdOrder = await this.ordersService.create(order);
        this.notifyQueue("add", createdOrder);
        return createdOrder;
    }

    @Put(":id")
    async update(@Param("id") id, @Body() order: OrderModel) {
        this.logger.log(`/PUT/${id}`, this.constructor.name);
        const updatedOrder = await this.ordersService.update(id, order);
        this.notifyQueue("update", updatedOrder);
        return updatedOrder;
    }

    @Delete(":id")
    async remove(@Param("id") id) {
        this.logger.log(`/DELETE/${id}`, this.constructor.name);
        const deletedOrder = await this.ordersService.remove(id);
        this.notifyQueue("delete", deletedOrder);
        return deletedOrder;
    }

    private notifyQueue(eventType: NotificationEventType, message: OrderModel) {
        this.notificationPublisher.publish({ resourceType: "orders", type: eventType, message: message });
    }
}
