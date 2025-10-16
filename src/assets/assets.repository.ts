import { Injectable } from '@nestjs/common';
import { PrismaService } from 'prisma/prisma.service';
import { CreateAssetDto } from './dto/create-asset.dto';
import { UpdateAssetDto } from './dto/update-asset.dto';

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

  async findAll() {
    return this.prisma.assets.findMany();
  }

  async findOne(id: string) {
    return this.prisma.assets.findUnique({
      where: { id: Number(id) },
    });
  }

  async listAssestsByEmployee(employeeId: string){
    return this.prisma.assets.findMany({
      where: { employeeId: Number(employeeId)}
    });
  }

  async update(id: string, updateAssetDto: UpdateAssetDto) {
    return this.prisma.assets.update({
      where: { id: Number(id) },
      data: updateAssetDto,
    });
  }

  async remove(id: string) {
    return this.prisma.assets.delete({ 
        where: { id: Number(id) } 
    });
  }
}
