import { BadRequestException, Injectable } from '@nestjs/common';
import { CreateEmployeeDto } from './dto/create-employee.dto';
import { UpdateEmployeeDto } from './dto/update-employee.dto';
import { EmployeesRepository } from './employees.repository';
import { ResponseEmployeeDto } from './dto/response-employee.dto';
import { plainToClass, plainToInstance } from 'class-transformer';
import { Prisma } from '@prisma/client';

@Injectable()
export class EmployeesService {
  constructor(private readonly repo: EmployeesRepository){}


  async create(createEmployeeDto: CreateEmployeeDto): Promise<ResponseEmployeeDto> {
    return plainToInstance(ResponseEmployeeDto, this.repo.create(createEmployeeDto));
  }


  async findAll(): Promise<ResponseEmployeeDto[]>{
    const employess = await this.repo.findAll();
    return employess.map((e) => plainToClass(ResponseEmployeeDto, e));
  }

  findOne(id: number) {
    return `This action returns a #${id} employee`;
  }

  update(id: number, updateEmployeeDto: UpdateEmployeeDto) {
    return `This action updates a #${id} employee`;
  }

  remove(id: number) {
    return `This action removes a #${id} employee`;
  }
}
