import { PartialType } from '@nestjs/mapped-types';
import { CreateAssetDto } from './create-asset.dto';
import { IsEnum, IsOptional, IsString } from 'class-validator';
import { AssetStatus } from '@prisma/client';

export class UpdateAssetDto extends PartialType(CreateAssetDto) {
  @IsOptional()
  @IsString()
  name?: string;

  @IsOptional()
  @IsString()
  type?: string;

  @IsOptional()
  @IsEnum(AssetStatus)
  status?: AssetStatus;
}
