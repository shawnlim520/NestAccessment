import { ForbiddenException, Injectable } from "@nestjs/common";
import { PrismaClientKnownRequestError } from "@prisma/client/runtime";
import { PrismaService } from "src/prisma/prisma.service";
// import { CreateEmployeeDto, EditEmployeeDto } from "./dto";

@Injectable()
export class EmployeeService{
  constructor(private prisma: PrismaService){}

}