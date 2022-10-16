import { ForbiddenException, Injectable } from "@nestjs/common";
import { PrismaClientKnownRequestError } from "@prisma/client/runtime";
import { PrismaService } from "src/prisma/prisma.service";
// import { CreateEmployeeDto, EditEmployeeDto } from "./dto";

@Injectable()
export class EmployeeService{
  constructor(private prisma: PrismaService){}
  getEmployees() {
    return this.prisma.employee.findMany()
}


 async createEmployee(dto: CreateEmployeeDto) {
    try {
        const user = await this.prisma.employee.create({
            data: {
                username:dto.username,
                fullname:dto.fullname,
                salary:dto.salary,
            }
        })
        return user; 
    } catch (error) {
        if (error instanceof PrismaClientKnownRequestError) {
            if (error.code === 'P2002') {
                throw new ForbiddenException('Credentials taken');
            }
        }
    }

}


async getEmployeeById(userId:number) {
    const user = await this.prisma.employee.findUnique({
        where: {
            id: userId
        }
    })

    return user;
}


async editEmployeeById(userId:number, dto: EditEmployeeDto) {
    const user = await this.prisma.employee.update({
        where: {
            id: userId
        },
        data: {
            username:dto.username,
            fullname:dto.fullname,
            salary:dto.salary,
        }
    })

    return user;
}


async deleteEmployeeById(userId:number) {
    const user = await this.prisma.employee.delete({
        where: {
            id:userId
        }
    })

    return user;
}
}