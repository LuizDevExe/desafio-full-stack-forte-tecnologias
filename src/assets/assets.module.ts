import { Module } from '@nestjs/common';
import { AssetsService } from './assets.service';
import { AssetsController } from './assets.controller';
import { AssetsRepository } from './assets.repository';
import { PrismaService } from 'prisma/prisma.service';
import { EmployeesRepository } from 'src/employees/employees.repository';

@Module({
  controllers: [AssetsController],
  providers: [AssetsService, AssetsRepository,EmployeesRepository, PrismaService],
})
export class AssetsModule {}
