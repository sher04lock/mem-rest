import { Injectable } from '@nestjs/common';
import { OrderModel, IOrder, OrderDocument } from 'src/orders/order';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';

@Injectable()
export class OrdersService {
    constructor(@InjectModel('Order') private readonly orderModel: Model<OrderDocument>) { }

    async create(order: OrderModel) {
        const createdOrder = new this.orderModel(order);
        return await createdOrder.save();
    }

    async getAll(): Promise<IOrder[]> {
        return await this.orderModel.find().exec();
    }

    async getById(id: string): Promise<IOrder> {
        return await this.orderModel.findById(id);
    }

    async getByDate(date: Date): Promise<IOrder[]> {
        return await this.orderModel.find({ date: date });
    }

    async update(id: string, order: OrderModel) {
        const returnUpdatedObject = { new: true };
        return await this.orderModel.findByIdAndUpdate(id, order, returnUpdatedObject);
    }

    async remove(id: string) {
        return await this.orderModel.findByIdAndDelete(id);
    }
}
