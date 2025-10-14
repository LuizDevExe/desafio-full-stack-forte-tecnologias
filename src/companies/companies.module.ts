import { Module } from '@nestjs/common';
import { CompaniesService } from './companies.service';
import { CompaniesController } from './companies.controller';
import { CompaniesRepository } from './comapanies.repository';
import { PrismaService } from 'prisma/prisma.service';

@Module({
  controllers: [CompaniesController],
  providers: [CompaniesService, CompaniesRepository,PrismaService],
})
export class CompaniesModule {}
