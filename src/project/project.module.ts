import { Module } from '@nestjs/common';
import { ProjectService } from './project.service';
import { ProjectController } from './project.controller';
import { KnexService } from 'src/config/config.knex';
import { ProjectRepo } from './project.repo';

@Module({
  providers: [ProjectService, KnexService, ProjectRepo],
  controllers: [ProjectController]
})
export class ProjectModule {}
