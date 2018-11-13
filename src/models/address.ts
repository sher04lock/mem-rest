import { ApiModelProperty, ApiModelPropertyOptional } from "@nestjs/swagger";

export interface IAddress {
    country: string;
    city: string;
    zipCode?: string;
    street: string;
    streetNumber: string;
};

export class AddressModel implements IAddress {
    @ApiModelProperty()
    country: string;
    @ApiModelProperty()
    city: string;
    @ApiModelPropertyOptional()
    zipCode?: string;
    @ApiModelProperty()
    street: string;
    @ApiModelProperty()
    streetNumber: string;
}
