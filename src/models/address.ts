import { ApiModelProperty, ApiModelPropertyOptional } from "@nestjs/swagger";
import { IsString, IsOptional } from "class-validator";

export interface IAddress {
    country: string;
    city: string;
    zipCode?: string;
    street: string;
    streetNumber: string;
};

export class AddressModel implements IAddress {
    @IsString()
    @ApiModelProperty()
    country: string;

    @IsString()
    @ApiModelProperty()
    city: string;

    @IsOptional()
    @IsString()
    @ApiModelPropertyOptional()
    zipCode?: string;

    @IsString()
    @ApiModelProperty()
    street: string;

    @IsString()
    @ApiModelProperty()
    streetNumber: string;
}
