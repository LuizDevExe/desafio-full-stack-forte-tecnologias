import { Expose } from 'class-transformer';
import { Companies } from 'generated/prisma';

export class ResponseCompanyDto {
  @Expose()
  id: number;

  @Expose()
  name: string;

  @Expose()
  cnpj: string;


}



