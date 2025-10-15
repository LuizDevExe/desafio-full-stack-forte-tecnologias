import { BadRequestException, Injectable, NotFoundException } from "@nestjs/common";
import { PrismaService } from "prisma/prisma.service";
import { CreateCompanyDto } from "./dto/create-company.dto";
import { ResponseCompanyDto } from "./dto/response-company.dto";
import { Prisma } from "@prisma/client";
import { UpdateCompanyDto } from "./dto/update-company.dto";

@Injectable()
export class CompaniesRepository{
  constructor(private readonly prisma: PrismaService) {}

  async create(data: Prisma.CompaniesCreateInput){
    const existingCompany = await this.prisma.companies.findUnique({
      where: {cnpj: data.cnpj}
    });

    if(existingCompany){
      throw new BadRequestException('Já existe uma empresa cadastrada com esse CNPJ');
    }

    return this.prisma.companies.create({data})
  }

  async findAll(): Promise<ResponseCompanyDto[]> {
    return this.prisma.companies.findMany();
  }


  async findOne(id:string){
    return this.prisma.companies.findUnique({ where: { id: Number(id) } });
  }
    

  async update(id:string, data: UpdateCompanyDto){
    const existing =  await this.findOne(id);

    console.log('Data update:', data);

    if (!existing) return null;

    return this.prisma.companies.update(
      {
        where: {id: Number(id)},
        data  
      }
    );
  }
}