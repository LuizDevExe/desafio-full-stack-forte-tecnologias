import { Module } from '@nestjs/common';

import { CompaniesModule } from './companies/companies.module';
import { EmployeesModule } from './employees/employees.module';
import { AssetsModule } from './assets/assets.module';



@Module({
  imports: [CompaniesModule, EmployeesModule, AssetsModule],
  controllers: [],
  providers: [],
})
export class AppModule {}
