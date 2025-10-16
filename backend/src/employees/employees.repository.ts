import { UpdateEmployeeDto } from './dto/update-employee.dto';
import { BadRequestException, Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from 'prisma/prisma.service';
import { CreateEmployeeDto } from './dto/create-employee.dto';
import { Prisma } from '@prisma/client';

@Injectable()
export class EmployeesRepository {
  constructor(private readonly prisma: PrismaService) {}

  async create(data: CreateEmployeeDto) {
    try {
      return await this.prisma.employees.create({
        data: {
          name: data.name,
          email: data.email,
          cpf: data.cpf,
          company: { connect: { id: data.companyId } },
        },
      });
    } catch (error) {
      if (error instanceof Prisma.PrismaClientKnownRequestError) {
        if (error.code === 'P2002') {
          const target = (error.meta as any)?.target;
          if (Array.isArray(target) && target.includes('email')) {
            throw new BadRequestException('Email já está cadastrado.');
          }
          if (Array.isArray(target) && target.includes('cpf')) {
            throw new BadRequestException('CPF já está cadastrado.');
          }
        }
        throw error;
      }
    }
  }

  async findByCompany(companyId: string){
    return this.prisma.employees.findMany({
      where: { companyId: Number(companyId)}
    })
  }

 
  async findAll() {
    return this.prisma.employees.findMany();
  }

   async findById(id: string) {
    const existing =  await this.prisma.employees.findUnique({
      where: { id: Number(id) },
      include: { company: true },
     
    });

    if(!existing){
        throw new NotFoundException('Employee não encontrado');
    }

    return existing;
  }


  async update(id: string, updateEmployeeDto: UpdateEmployeeDto){
    const existing = await this.prisma.employees.findUnique({
        where: {id: Number(id)}
    })

    if(!existing){
        throw new NotFoundException('Employee não encontrado');
    }

    if(updateEmployeeDto.companyId){
        throw new BadRequestException('O campo companyId não pode ser alterado');
    }

    if(updateEmployeeDto.cpf){
        throw new BadRequestException('O campo CPF não pode ser alterado');
    }

    return this.prisma.employees.update({
        where: {id: Number(id)},
        data: updateEmployeeDto
    });
  }

  async remove(id: string){
    const existing = await this.prisma.employees.findUnique({
        where: {id: Number(id)}
    });

    if(!existing){
        throw new NotFoundException('Employee não encontrado');
    }

    return this.prisma.employees.delete({
        where: {id: Number(id)}
    });

  }
}
