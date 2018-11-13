import { ApiModelProperty } from "@nestjs/swagger";

export class ItemModel {
    @ApiModelProperty()
    name: string;
    @ApiModelProperty()
    quantity: number;
    @ApiModelProperty()
    price: number;
}
