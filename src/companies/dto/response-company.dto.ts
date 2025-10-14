import { Companies } from 'generated/prisma';

export class ResponseCompanyDto {
  id: number;
  name: string;
  cnpj: string;

  constructor(company: Companies) {
    this.id = company.id;
    this.name = company.name;
    this.cnpj = company.cnpj;
  }
}



