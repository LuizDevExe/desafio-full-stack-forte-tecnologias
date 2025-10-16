import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
} from '@nestjs/common';
import { AssetsService } from './assets.service';
import { CreateAssetDto } from './dto/create-asset.dto';
import { UpdateAssetDto } from './dto/update-asset.dto';

@Controller('assets')
export class AssetsController {
  constructor(private readonly assetsService: AssetsService) {}

  @Post()
  create(@Body() createAssetDto: CreateAssetDto) {
    return this.assetsService.create(createAssetDto);
  }

  @Get()
  findAll() {
    return this.assetsService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.assetsService.findOne(id);
  }

  @Get('employee/:id')
  listByEmployeId(@Param('id') id: string) {
    return this.assetsService.listAssetsByEmployee(id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateAssetDto: UpdateAssetDto) {
    return this.assetsService.update(id, updateAssetDto);
  }

  @Patch(':assetId/associate/:employeeId')
  associate(
    @Param('assetId') assetId: string,
    @Param('employeeId') employeeId: string,
  ) {
    return this.assetsService.associate(assetId, employeeId);
  }

  @Patch(':id/dissociate')
  async dissociate(@Param('id') id: string) {
    return this.assetsService.dissociate(id);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.assetsService.remove(id);
  }
}
