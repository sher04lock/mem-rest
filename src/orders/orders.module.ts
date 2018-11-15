import { Module } from '@nestjs/common';
import { OrdersController } from './orders.controller';
import { OrdersService } from './orders.service';
import { MongooseModule } from '@nestjs/mongoose';
import { OrderSchema } from './orders.schema';
import { Model } from 'mongoose';
import { OrderDocument } from 'src/orders/order';
import { CommonModule } from 'src/common/common.module';

type orderModel = Model<OrderDocument>

@Module({
    imports: [
        MongooseModule.forFeature([{ name: "Order", schema: OrderSchema }]),
        CommonModule
    ],
    controllers: [OrdersController],
    providers: [
        OrdersService
    ]
})
export class OrdersModule { }
