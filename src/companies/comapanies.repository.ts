import { BadRequestException, Injectable } from "@nestjs/common";
import { PrismaService } from "prisma/prisma.service";
import { CreateCompanyDto } from "./dto/create-company.dto";
import { ResponseCompanyDto } from "./dto/response-company.dto";
import { Prisma } from "@prisma/client";

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


 
}