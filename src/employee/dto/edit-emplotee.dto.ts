import { Type } from "class-transformer"
import { IsNotEmpty, IsNumber, IsString, Min } from "class-validator"

export class EditEmployeeDto{
    @IsString()
    username: string

    @IsString()
    fullname: string

    @Type(() => Number)
    @IsNumber({ maxDecimalPlaces: 2 })
    @Min(0)
    salary: number
}