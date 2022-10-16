import { Type } from "class-transformer"
import { IsNotEmpty, IsNumber, IsOptional, IsString, Min } from "class-validator"

export class EditEmployeeDto{
    @IsString()
    @IsOptional()
    username: string

    @IsString()
    @IsOptional()
    fullname: string

    @Type(() => Number)
    @IsNumber({ maxDecimalPlaces: 2 })
    @Min(0)
    @IsOptional()
    salary: number
}