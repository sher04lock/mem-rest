import { IAddress, AddressModel } from "./address";
import { ApiModelProperty } from "@nestjs/swagger";
import { IsString } from "class-validator";

export interface ICustomer {
    firstName: string;
    lastName: string;
    address: IAddress
}

export class CustomerModel implements ICustomer {
    @IsString()
    @ApiModelProperty()
    firstName: string;

    @IsString()
    @ApiModelProperty()
    lastName: string;

    @ApiModelProperty()
    address: AddressModel;
}
