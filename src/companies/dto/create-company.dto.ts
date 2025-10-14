import { IsNotEmpty, IsString, Length } from 'class-validator';

export class CreateCompanyDto {
  @IsNotEmpty()
  @IsString()
  name: string;

  @IsNotEmpty()
  @Length(14, 14, { message: 'O cnpj deve conter 14 caracteres' })
  cnpj: string;
}
