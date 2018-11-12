import { Controller, Get, Post, Param, Body, Put, Delete, Logger } from '@nestjs/common';
import { OrderModel } from 'src/models/order';
import { OrdersService } from './orders.service';

@Controller('orders')
export class OrdersController {
    private readonly logger = new Logger();

    constructor(private readonly ordersService: OrdersService) { }

    @Get()
    getAll() {
        this.logger.log("getAll", this.constructor.name);
        return this.ordersService.getAll();
    }

    @Get(":id")
    getById(@Param("id") id) {
        this.logger.log("getById", this.constructor.name);
        return this.ordersService.getById(id);
    }

    @Post()
    create(@Body() order: OrderModel) {
        this.logger.log("createOrder", this.constructor.name);
        return this.ordersService.create(order);
    }

    @Put(":id")
    async update(@Param("id") id, @Body() order: OrderModel) {
        this.logger.log("updateorder", this.constructor.name);
        return this.ordersService.update(id, order);
    }

    @Delete(":id")
    async remove(@Param("id") id) {
        this.logger.log(`delete order ${id}`, this.constructor.name);
        return this.ordersService.remove(id);
    }
}
