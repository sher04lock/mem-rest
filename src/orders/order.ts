import { ItemModel } from "../models/item";
import { Document } from "mongoose";
import { ICustomer, CustomerModel } from "../models/customer";
import { ApiModelProperty, ApiModelPropertyOptional } from "@nestjs/swagger";
import { IsDate, IsDateString, IsString, IsOptional, IsArray, IsNotEmpty } from "class-validator";

export interface IOrder {
    date: Date;
    title: string;
    userId?: string;
    items: ItemModel[];
    customer: ICustomer;
    remarks?: string;
    email?: string;
    phone?: string;
}

export interface OrderDocument extends IOrder, Document { }


export class OrderModel implements IOrder {
    @IsOptional()
    @IsString()
    @ApiModelPropertyOptional()
    readonly remarks?: string;

    @ApiModelPropertyOptional()
    readonly userId?: string;

    @ApiModelProperty()
    readonly customer: CustomerModel;

    @IsOptional()
    @IsString()
    @ApiModelPropertyOptional()
    readonly email?: string;

    @IsOptional()
    @IsString()
    @ApiModelPropertyOptional()
    readonly phone?: string;

    @IsDateString()
    @ApiModelProperty()
    readonly date: Date;

    @IsString()
    @ApiModelProperty()
    readonly title: string;

    @IsArray()
    @ApiModelProperty({ type: [ItemModel] })
    readonly items: ItemModel[];
}

