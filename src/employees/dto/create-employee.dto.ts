import { Expose } from 'class-transformer';
import { IsEmail, IsInt, IsNotEmpty, IsString, Length } from 'class-validator';

export class CreateEmployeeDto {
  @IsString({message: 'Campo precisa ser um texto válido'})
  @IsNotEmpty({message: 'Campo não pode estar vazio'})
  @Expose()
  name: string;

  @IsString({message: 'Campo precisa ser um texto válido'})
  @IsNotEmpty({message: 'Campo não pode estar vazio'})
  @Expose()
  email: string;

  @IsString({message: 'Campo precisa ser um texto válido'})
  @IsNotEmpty({message: 'Campo não pode estar vazio'})
  @Expose()
  @Length(11,11, {message: 'O CPF deve conter no mínimo 11 dígitos'})
  cpf: string;

  @IsInt({message: 'Campo companieId aceita apenas números'})
  @IsNotEmpty({message: 'Campo não pode estar vazio'})
  @Expose()
  companieId: number;
}
