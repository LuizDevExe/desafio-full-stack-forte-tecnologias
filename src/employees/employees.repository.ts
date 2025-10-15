import { Injectable } from "@nestjs/common";
import { PrismaService } from "prisma/prisma.service";
import { CreateEmployeeDto } from "./dto/create-employee.dto";

@Injectable()
export class EmployeesRepository{
    constructor(private readonly prisma: PrismaService){}


    async create(data: CreateEmployeeDto){
        return this.prisma.employees.create({
            data:{
                name: data.name,
                email: data.email,
                cpf: data.cpf,
                company: {connect: { id: data.companieId}}
            }
        });
    }

    async findByCpf(cpf: string){

        return await this.prisma.employees.findUnique({
            where: {cpf},
            include: {company: true}
        });

    }
}