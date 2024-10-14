import { Module } from '@nestjs/common';
import { UsersService } from './users.service';
import { UsersController } from './users.controller';
import { UsersRepo } from './users.repo';
import { KnexService } from 'src/config/config.knex';

@Module({
  imports: [],
  providers: [UsersService, UsersRepo, KnexService],
  controllers: [UsersController]
})
export class UsersModule {}
