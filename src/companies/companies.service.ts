import { Injectable } from '@nestjs/common';
import { CreateCompanyDto } from './dto/create-company.dto';
import { UpdateCompanyDto } from './dto/update-company.dto';
import { CompaniesRepository } from './comapanies.repository';
import { ResponseCompanyDto } from './dto/response-company.dto';

@Injectable()
export class CompaniesService {
  constructor(private readonly repo: CompaniesRepository ){}

  async create(data: CreateCompanyDto): Promise<ResponseCompanyDto>{
    const company = await this.repo.create(data);
    return new ResponseCompanyDto(company);
  }

  async findAll(): Promise<ResponseCompanyDto[]> {
    const companies = await this.repo.findAll();
    return companies.map((comapany) =>  new ResponseCompanyDto(comapany))
  }


  findOne(id: number) {
    return `This action returns a #${id} company`;
  }

  update(id: number, updateCompanyDto: UpdateCompanyDto) {
    return `This action updates a #${id} company`;
  }

  remove(id: number) {
    return `This action removes a #${id} company`;
  }
}
