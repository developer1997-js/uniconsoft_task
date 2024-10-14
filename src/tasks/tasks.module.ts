import { Module } from '@nestjs/common';
import { TasksController } from './tasks.controller';
import { TasksService } from './tasks.service';
import { TasksRepo } from './tasks.repo';
import { KnexService } from 'src/config/config.knex';

@Module({
  controllers: [TasksController],
  providers: [TasksService, TasksRepo, KnexService]
})
export class TasksModule {}
