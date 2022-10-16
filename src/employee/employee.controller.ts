import { Body, Controller, Delete, Get, Param, ParseIntPipe, Patch, Post } from "@nestjs/common";
import { CreateEmployeeDto, EditEmployeeDto } from "./dto";
import { EmployeeService } from "./employee.service";
// import { CreateEmployeeDto, EditEmployeeDto } from "./dto"

@Controller('employees')
export class EmployeeController{
    constructor(private EmployeeService: EmployeeService){}
    @Get()
    getemployees(
    ) {
        return this.EmployeeService.getEmployees()
    }

    @Get(':id')
    getEmployeeById(
        @Param('id',ParseIntPipe) employeeId:number,
    ) {
        return this.EmployeeService.getEmployeeById(employeeId)
    }

    @Post()
    createEmployee(
        @Body() dto: CreateEmployeeDto,
    ) {
        return this.EmployeeService.createEmployee(
            dto
        )
    }

    @Patch(':id')
    editEmployeeById(
        @Param('id',ParseIntPipe) employeeId:number,
        @Body() dto: EditEmployeeDto,
    ) {
        return this.EmployeeService.editEmployeeById(
            employeeId,
            dto
        )
    }

    @Delete(':id')
    deleteEmployeeById(
        @Param('id',ParseIntPipe) employeeId:number,
    ) {
        return this.EmployeeService.deleteEmployeeById(employeeId)
    }

}