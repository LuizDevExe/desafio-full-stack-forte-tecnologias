import { Injectable } from '@nestjs/common';
import { CreateAssetDto } from './dto/create-asset.dto';
import { UpdateAssetDto } from './dto/update-asset.dto';
import { ResponseAssetDto } from './dto/response-asset.dto';
import { AssetsRepository } from './assets.repository';
import { plainToInstance } from 'class-transformer';

@Injectable()
export class AssetsService {
  constructor(private readonly repo: AssetsRepository){}
  
  async create(createAssetDto: CreateAssetDto): Promise<ResponseAssetDto> {
    const asset = await this.repo.create(createAssetDto);
    return plainToInstance(ResponseAssetDto, asset, { excludeExtraneousValues: true });
  }

  findAll() {
    return `This action returns all assets`;
  }

  findOne(id: number) {
    return `This action returns a #${id} asset`;
  }

  update(id: number, updateAssetDto: UpdateAssetDto) {
    return `This action updates a #${id} asset`;
  }

  remove(id: number) {
    return `This action removes a #${id} asset`;
  }
}
