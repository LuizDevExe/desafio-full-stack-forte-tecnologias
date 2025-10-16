import { IsNotEmpty, IsString, Length } from 'class-validator';

export class CreateCompanyDto {
  @IsNotEmpty({message: 'Campo não pode estar vazio'})
  @IsString({message: 'Campo precisa ser um texto válido'})
  name: string;

  @IsNotEmpty({message: 'Campo não pode estar vazio'})
  @Length(14, 14, { message: 'O cnpj deve conter 14 caracteres' })
  cnpj: string;
}
