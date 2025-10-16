import { Injectable, NotFoundException } from '@nestjs/common';
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

  async findAll(): Promise<ResponseAssetDto[]>{
    const assets = await this.repo.findAll();
    return plainToInstance(ResponseAssetDto, assets);
  }

  async findOne(id: string): Promise <ResponseAssetDto> {
    const asset = await this.repo.findOne(id);

    if (!asset){
      throw new NotFoundException('Asset não encontrado');
    }

    return plainToInstance(ResponseAssetDto, asset);
  }

  update(id: number, updateAssetDto: UpdateAssetDto) {
    return `This action updates a #${id} asset`;
  }

  remove(id: number) {
    return `This action removes a #${id} asset`;
  }
}
