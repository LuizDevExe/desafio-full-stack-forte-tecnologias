import { Expose } from 'class-transformer';
import { AssetStatus } from '@prisma/client';

export class ResponseAssetDto {
  @Expose()
  id: number;

  @Expose()
  name: string;

  @Expose()
  type: string;

  @Expose()
  status: AssetStatus;

  @Expose()
  employeeId: number;
}
