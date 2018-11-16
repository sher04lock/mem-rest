import { ValidatorConstraint, ValidatorConstraintInterface, ValidationArguments } from "class-validator";
import moment = require("moment");


@ValidatorConstraint({ name: "StringToDateValidator", async: false })
export class StringToDateValidator implements ValidatorConstraintInterface {

    validate(text: string, validationArguments?: ValidationArguments): boolean | Promise<boolean> {
        return moment.utc(text).isValid();
    }

    defaultMessage?(validationArguments?: ValidationArguments): string {
        return "String cannot be convert to valid date.";
    }
}
