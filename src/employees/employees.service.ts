import { BadRequestException, Injectable } from '@nestjs/common';
import { CreateEmployeeDto } from './dto/create-employee.dto';
import { UpdateEmployeeDto } from './dto/update-employee.dto';
import { EmployeesRepository } from './employees.repository';

@Injectable()
export class EmployeesService {
  constructor(private readonly repo: EmployeesRepository){}


  async create(createEmployeeDto: CreateEmployeeDto) {
    const existing = await this.repo.findByCpf(createEmployeeDto.cpf)

    console.log(existing);

    if(existing){
          throw new BadRequestException('Já existe um employee cadastrado com esse CPF');
    }

    return this.repo.create(createEmployeeDto);
  }

  findAll() {
    return `This action returns all employees`;
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
