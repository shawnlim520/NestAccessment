import { Body, Controller, Delete, Get, Param, ParseIntPipe, Patch, Post } from "@nestjs/common";
import { EmployeeService } from "./employee.service";
// import { CreateEmployeeDto, EditEmployeeDto } from "./dto"

@Controller('employees')
export class EmployeeController{
    constructor(private EmployeeService: EmployeeService){}

}