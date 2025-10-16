import { Expose } from 'class-transformer';

export class ResponseEmployeeDto {
  @Expose()
  id: number;

  @Expose()
  name: string;

  @Expose()
  email: string;

  @Expose()
  cpf: string;

  @Expose()
  companieId: number;

  @Expose()
  createdAt: Date;

  @Expose()
  updatedAt: Date;
}
