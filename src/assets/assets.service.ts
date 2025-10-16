import { BadRequestException, Injectable, NotFoundException } from '@nestjs/common';
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

  async listAssetsByEmployee(id: string){    
    const assets = await this.repo.listAssestsByEmployee(id);

    if (assets.length === 0){
      throw new NotFoundException('Nenhum asset vinculado ao employee');
    }

    return plainToInstance(ResponseAssetDto, assets);

  }

  async update(id: string, updateAssetDto: UpdateAssetDto): Promise<ResponseAssetDto> {
    const asset = await this.repo.findOne(id);

    if (!asset){
      throw new NotFoundException('Asset não encontrado');
    }


    return plainToInstance(ResponseAssetDto, this.repo.update(id, updateAssetDto));
  }

  async remove(id: string) {
    const asset = await this.repo.findOne(id);

    if (!asset){
      throw new NotFoundException('Asset não encontrado');
    }

    const deleted = await this.repo.remove(id);

    return {
      message: 'Asset deletado!',
      data: plainToInstance(ResponseAssetDto, deleted)
    }

  }
}
