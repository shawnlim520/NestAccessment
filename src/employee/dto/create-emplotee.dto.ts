import { Type } from "class-transformer"
import { IsNotEmpty, IsNumber, IsString, Min } from "class-validator"

export class CreateEmployeeDto{
    @IsString()
    @IsNotEmpty()
    username: string

    @IsString()
    @IsNotEmpty()
    fullname: string 

    @Type(() => Number)
    @IsNumber({ maxDecimalPlaces: 2 })
    @Min(0)
    @IsNotEmpty()
    salary: number
}