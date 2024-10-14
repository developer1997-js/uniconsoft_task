import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { KnexService } from './config/config.knex';
import { UsersModule } from './users/users.module';
import { OrganizationsModule } from './organizations/organizations.module';
import { OrganizationUserModule } from './organization_user/organization_user.module';
import { ProjectModule } from './project/project.module';
import { TasksModule } from './tasks/tasks.module';
import { EmployeeTasksModule } from './employee_tasks/employee_tasks.module';


@Module({
  imports: [
         ConfigModule.forRoot(), 
         UsersModule, 
         OrganizationsModule, 
         OrganizationUserModule, 
         ProjectModule, 
         TasksModule, 
         EmployeeTasksModule
        ],
  controllers: [],
  providers: [KnexService],
})
export class AppModule {}
