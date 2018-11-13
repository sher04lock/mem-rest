import { IAddress, AddressModel } from "./address";
import { ApiModelProperty } from "@nestjs/swagger";

export interface ICustomer {
    firstName: string;
    lastName: string;
    address: IAddress
}

export class CustomerModel implements ICustomer {
    @ApiModelProperty()
    firstName: string;

    @ApiModelProperty()
    lastName: string;

    @ApiModelProperty()
    address: AddressModel;
}
