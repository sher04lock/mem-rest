import { ApiModelProperty } from "@nestjs/swagger";
import { IsString, IsNumber } from "class-validator";

export class ItemModel {
    @IsString()
    @ApiModelProperty()
    name: string;

    @IsString()
    @ApiModelProperty()
    quantity: number;

    @IsNumber()
    @ApiModelProperty()
    price: number;
}
