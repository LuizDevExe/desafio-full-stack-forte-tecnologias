import { Module } from '@nestjs/common';
import { EmployeesService } from './employees.service';
import { EmployeesController } from './employees.controller';
import { EmployeesRepository } from './employees.repository';
import { PrismaService } from 'prisma/prisma.service';

@Module({
  controllers: [EmployeesController],
  providers: [EmployeesService, EmployeesRepository, PrismaService],
})
export class EmployeesModule {}
