import { Module } from '@nestjs/common';
import { EmployeeTasksService } from './employee_tasks.service';
import { EmployeeTasksController } from './employee_tasks.controller';
import { EmployeeTasksRepo } from './employee_tasks.repo';
import { KnexService } from 'src/config/config.knex';

@Module({
  providers: [EmployeeTasksService, EmployeeTasksRepo, KnexService],
  controllers: [EmployeeTasksController]
})
export class EmployeeTasksModule {}
