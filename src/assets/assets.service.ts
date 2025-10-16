import { BadRequestException, Injectable, NotFoundException } from '@nestjs/common';
import { CreateAssetDto } from './dto/create-asset.dto';
import { UpdateAssetDto } from './dto/update-asset.dto';
import { ResponseAssetDto } from './dto/response-asset.dto';
import { AssetsRepository } from './assets.repository';
import { plainToInstance } from 'class-transformer';
import { EmployeesRepository } from 'src/employees/employees.repository';

@Injectable()
export class AssetsService {
  constructor(private readonly repo: AssetsRepository,  private readonly employeeRepo: EmployeesRepository){}
  
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


  async associate(assetId: string, employeeId: string) {
  const asset = await this.repo.findOne(assetId);
  if (!asset) throw new NotFoundException('Ativo não encontrado');
  if (asset.status !== 'DISPONIVEL') {
    throw new BadRequestException('Ativo não está disponível para associação');
  }

  const employee = await this.employeeRepo.findById(employeeId);
  if (!employee) throw new NotFoundException('Funcionário não encontrado');

  if (asset.type === 'Notebook') {
    const employeeAssets = await this.repo.listAssestsByEmployee(employeeId);

    const hasNotebook = employeeAssets.some(a => a.type === 'Notebook');
    if (hasNotebook) {
      throw new BadRequestException('Funcionário já possui um notebook associado');
    }
  }

  return this.repo.update(assetId, {
    employeeId: Number(employeeId),
    status: 'EM_USO',
  });
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
