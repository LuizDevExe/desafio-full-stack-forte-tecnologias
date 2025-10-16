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
    return employess.map((e) => plainToInstance(ResponseEmployeeDto, e));
  }

  async findOne(id: string): Promise<ResponseEmployeeDto> {
    return plainToInstance(ResponseEmployeeDto, this.repo.findById(id));
  }

  async update(id: string, updateEmployeeDto: UpdateEmployeeDto) {
    const updatedEmployee = await this.repo.update(id,updateEmployeeDto);
    return plainToInstance(UpdateEmployeeDto, updatedEmployee);
  }

  remove(id: number) {
    return `This action removes a #${id} employee`;
  }
}
