import { AssetStatus } from '@prisma/client';
import { Expose } from 'class-transformer';
import {  IsEnum, IsInt, IsNotEmpty, IsString } from 'class-validator';

export class CreateAssetDto {
  @IsString({ message: 'Campo name precisa ser um texto válido' })
  @IsNotEmpty({ message: 'Campo name não pode estar vazio' })
  @Expose()
  name: string;

  @IsString({ message: 'Campo type precisa ser um texto válido' })
  @IsNotEmpty({ message: 'Campo type não pode estar vazio' })
  @Expose()
  type: string;

  @IsEnum(AssetStatus)
  @Expose()
  status?: AssetStatus;

  @IsInt({ message: 'Campo companyId aceita apenas números' })
  @IsNotEmpty({ message: 'Campo employeeId não pode estar vazio' })
  @Expose()
  employeeId: number;
}
