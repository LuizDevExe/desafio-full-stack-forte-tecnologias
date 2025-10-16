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
          company: { connect: { id: data.companieId } },
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
}
