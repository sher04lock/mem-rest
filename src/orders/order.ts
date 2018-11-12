import { ItemModel } from "../models/item";
import { Document } from "mongoose";
import { ICustomer } from "../models/customer";


export interface IOrder {
    date: Date;
    title: string;
    remarks: string;
    userId: string;
    items: ItemModel[];
    customer: ICustomer;
    email?: string;
    phone?: string;
}

export interface OrderDocument extends IOrder, Document { }


export class OrderModel implements IOrder {
    readonly remarks: string;
    readonly userId: string;
    readonly customer: ICustomer;
    readonly email?: string;
    readonly phone?: string;
    readonly date: Date;
    readonly title: string;
    readonly items: ItemModel[];
}

