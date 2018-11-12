import { Module } from '@nestjs/common';
import { OrdersController } from './orders.controller';
import { OrdersService } from './orders.service';
import { MongooseModule, getModelToken } from '@nestjs/mongoose';
import { OrderSchema } from './orders.schema';
import { Model } from 'mongoose';
import { OrderDocument } from 'src/orders/order';

type orderModel = Model<OrderDocument>

@Module({
    imports: [
        MongooseModule.forFeature([{ name: "Order", schema: OrderSchema }])
    ],
    controllers: [OrdersController],
    providers: [
        OrdersService
    ]
})
export class OrdersModule { }
