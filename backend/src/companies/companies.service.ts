import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateCompanyDto } from './dto/create-company.dto';
import { UpdateCompanyDto } from './dto/update-company.dto';
import { CompaniesRepository } from './comapanies.repository';
import { ResponseCompanyDto } from './dto/response-company.dto';
import { plainToInstance } from 'class-transformer';

@Injectable()
export class CompaniesService {
  constructor(private readonly repo: CompaniesRepository ){}

  async create(data: CreateCompanyDto): Promise<ResponseCompanyDto>{
    const company = await this.repo.create(data);
    return plainToInstance( ResponseCompanyDto, company);
  }

  async findAll(): Promise<ResponseCompanyDto[]> {
    const companies = await this.repo.findAll();
    return companies.map((comapany) =>  plainToInstance(ResponseCompanyDto,comapany))
  }


  async findOne(id: string) {
    const company= await this.repo.findOne(id);

    if(!company){
      throw new NotFoundException(`Empresa com id ${id} não encontrada`);
    }

    return plainToInstance(ResponseCompanyDto, company);
  }

  async update(id: string, updateCompanyDto: UpdateCompanyDto): Promise<ResponseCompanyDto> {
    const updated =  await this.repo.update(id, updateCompanyDto);


    if(!updated){
      throw new NotFoundException(`Empresa com id ${id} não encontrada`);
    }

    return plainToInstance(ResponseCompanyDto, updated, {excludeExtraneousValues: true});
    }

  async remove(id: string) {
      const deleted = await this.repo.remove(id);

      if(!deleted){
        throw new NotFoundException(`Empresa com id ${id} não encontrada`);
      }

      const data = plainToInstance(ResponseCompanyDto, deleted);

      return {
        message: `Empresa deletada com successo!`,
        data
      }
  }
}
