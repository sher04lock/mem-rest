import { Controller, Get, Post, Param, Body, Put, Delete, Logger, BadRequestException, Query, UsePipes, ValidationPipe } from '@nestjs/common';
import { OrderModel } from './order';
import { OrdersService } from './orders.service';
import { NotificationsProducerService, NotificationEventType } from '../common/notifications/notifications-producer/notifications-producer.service';
import moment = require('moment');
import { ApiModelPropertyOptional, ApiImplicitQuery } from '@nestjs/swagger';

@Controller('orders')
export class OrdersController {
    private readonly logger = new Logger();

    constructor(
        private readonly ordersService: OrdersService,
        private readonly notificationPublisher: NotificationsProducerService
    ) { }

    @ApiImplicitQuery({
        name: "date",
        description: "Return orders with that date only.",
        required: false,
        type: String
    })
    @Get()
    getAll(@Query("date") dateString?: string) {
        if (dateString) {
            return this.getByDate(dateString);
        }

        this.logger.log("/GET", this.constructor.name);
        return this.ordersService.getAll();
    }

    @Get(":id")
    getById(@Param("id") id: string) {
        this.logger.log(`/GET/${id}`, this.constructor.name);
        return this.ordersService.getById(id);
    }

    getByDate(dateString: string) {
        this.logger.log(`/GET/date=${dateString}`, this.constructor.name);
        const utcDate = moment.utc(dateString);
        if (!utcDate.isValid()) {
            throw new BadRequestException("Invalid date");
        }

        return this.ordersService.getByDate(utcDate.toDate());
    }

    @Post()
    @UsePipes(new ValidationPipe({ transform: true }))
    async create(@Body() order: OrderModel) {
        this.logger.log(`/POST`, this.constructor.name);
        const createdOrder = await this.ordersService.create(order);
        this.notifyQueue("add", createdOrder);
        return createdOrder;
    }

    @Put(":id")
    @UsePipes(new ValidationPipe({ transform: true }))
    async update(@Param("id") id: string, @Body() order: OrderModel) {
        this.logger.log(`/PUT/${id}`, this.constructor.name);
        const updatedOrder = await this.ordersService.update(id, order);
        this.notifyQueue("update", updatedOrder);
        return updatedOrder;
    }

    @Delete(":id")
    async remove(@Param("id") id: string) {
        this.logger.log(`/DELETE/${id}`, this.constructor.name);
        const deletedOrder = await this.ordersService.remove(id);
        this.notifyQueue("delete", deletedOrder);
        return deletedOrder;
    }

    private notifyQueue(eventType: NotificationEventType, message: OrderModel) {
        this.notificationPublisher.publish({ resourceType: "orders", type: eventType, message: message });
    }
}
