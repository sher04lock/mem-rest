import { ItemModel } from "../models/item";
import { Document } from "mongoose";
import { ICustomer, CustomerModel } from "../models/customer";
import { ApiModelProperty, ApiModelPropertyOptional } from "@nestjs/swagger";
import { IsString, IsOptional, IsArray, Validate } from "class-validator";
import { StringToDateValidator } from "../pipes/string-to-date-validator";

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

    @Validate(StringToDateValidator)
    @ApiModelProperty({ type: String })
    readonly date: Date;

    @IsString()
    @ApiModelProperty()
    readonly title: string;

    @IsArray()
    @ApiModelProperty({ type: [ItemModel] })
    readonly items: ItemModel[];
}

