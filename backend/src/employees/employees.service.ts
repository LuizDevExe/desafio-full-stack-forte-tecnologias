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
    const createdEmployee = await this.repo.create(createEmployeeDto);
    return plainToInstance(ResponseEmployeeDto, createdEmployee);
  }


  async findAll(): Promise<ResponseEmployeeDto[]>{
    const employess = await this.repo.findAll();
    return employess.map((e) => plainToInstance(ResponseEmployeeDto, e));
  }

  async findOne(id: string): Promise<ResponseEmployeeDto> {
    const employee = await this.repo.findById(id);
    return plainToInstance(ResponseEmployeeDto, employee);
  }

  async findByCompany(companyId: string): Promise<ResponseEmployeeDto[]>{
    const employees = await this.repo.findByCompany(companyId);
    return plainToInstance(ResponseEmployeeDto, employees);
  }

  async update(id: string, updateEmployeeDto: UpdateEmployeeDto) {
    const updatedEmployee = await this.repo.update(id,updateEmployeeDto);
    return plainToInstance(UpdateEmployeeDto, updatedEmployee);
  }

  async remove(id: string) {
    const deletedEmployee = await this.repo.remove(id);
    return {
      message: `Employee Deletado!`,
      data: plainToInstance(ResponseEmployeeDto, deletedEmployee)
    };
  }
}
