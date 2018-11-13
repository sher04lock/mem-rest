import { ItemModel } from "../models/item";
import { Document } from "mongoose";
import { ICustomer, CustomerModel } from "../models/customer";
import { ApiModelProperty, ApiModelPropertyOptional } from "@nestjs/swagger";


export interface IOrder {
    date: Date;
    title: string;
    userId: string;
    items: ItemModel[];
    customer: ICustomer;
    remarks?: string;
    email?: string;
    phone?: string;
}

export interface OrderDocument extends IOrder, Document { }


export class OrderModel implements IOrder {
    @ApiModelPropertyOptional()
    readonly remarks?: string;

    @ApiModelProperty()
    readonly userId: string;

    @ApiModelProperty()
    readonly customer: CustomerModel;

    @ApiModelPropertyOptional()
    readonly email?: string;

    @ApiModelPropertyOptional()
    readonly phone?: string;

    @ApiModelProperty()
    readonly date: Date;

    @ApiModelProperty()
    readonly title: string;

    @ApiModelProperty({ type: [ItemModel] })
    readonly items: ItemModel[];
}

