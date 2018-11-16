import { Module } from '@nestjs/common';
import { OrdersController } from './orders.controller';
import { OrdersService } from './orders.service';
import { MongooseModule } from '@nestjs/mongoose';
import { OrderSchema } from './orders.schema';
import { CommonModule } from '../common/common.module';

@Module({
    imports: [
        MongooseModule.forFeature([{ name: "Order", schema: OrderSchema }]),
        CommonModule
    ],
    controllers: [OrdersController],
    providers: [
        OrdersService
    ],
    exports: [OrdersService]
})
export class OrdersModule { }
