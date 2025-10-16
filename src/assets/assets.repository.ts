import { Injectable } from '@nestjs/common';
import { PrismaService } from 'prisma/prisma.service';
import { CreateAssetDto } from './dto/create-asset.dto';

@Injectable()
export class AssetsRepository {
  constructor(private readonly prisma: PrismaService) {}

  async create(createAssetDto: CreateAssetDto) {
    return this.prisma.assets.create({
      data: {
        name: createAssetDto.name,
        type: createAssetDto.type,
        status: createAssetDto.status ?? 'DISPONIVEL',
        ...(createAssetDto.employeeId
          ? { employee: { connect: { id: createAssetDto.employeeId } } }
          : {}),
      },
    });
  }
}
