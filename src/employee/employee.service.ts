import { ForbiddenException, Injectable } from "@nestjs/common";
import { PrismaClientKnownRequestError } from "@prisma/client/runtime";
import { PrismaService } from "../prisma/prisma.service";
import { CreateEmployeeDto, EditEmployeeDto } from "./dto";

@Injectable()
export class EmployeeService{
  constructor(private prisma: PrismaService){}
  getEmployees() {
    return this.prisma.employee.findMany()
}


 async createEmployee(dto: CreateEmployeeDto) {

    try {
        const employee = await this.prisma.employee.create({
            data: {
                username:dto.username,
                fullname:dto.fullname,
                salary:dto.salary,
            }
        })
        return employee; 
    } catch (error) {
        if (error instanceof PrismaClientKnownRequestError) {
            if (error.code === 'P2002') {
                throw new ForbiddenException('Username Taken');
            }
        }
    }

}


async getEmployeeById(userId:number) {
    const employee = await this.prisma.employee.findUnique({
        where: {
            id: userId
        }
    })

    return employee;
}


async editEmployeeById(userId:number, dto: EditEmployeeDto) {

    const employee = await this.prisma.employee.findUnique({
      where: {
          id: userId
      },
  })
    if (!employee || employee.id !== userId) {
        throw new ForbiddenException('Access to resourcess denied');
    }

    return this.prisma.employee.update({
        where: {
            id: userId
        },
        data: {
            username:dto.username,
            fullname:dto.fullname,
            salary:dto.salary,
        }
    })
}


async deleteEmployeeById(userId:number) {
    const employee = await this.prisma.employee.findUnique({
        where: {
            id:userId
        }
    })

    if (!employee || employee.id !== userId) {
        throw new ForbiddenException('Access to resourcess denied');
    }

    return this.prisma.employee.delete({
        where: {
            id:userId
        }
    })

}
}