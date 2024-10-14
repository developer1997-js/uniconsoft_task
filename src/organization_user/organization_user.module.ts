import { Module } from '@nestjs/common';
import { OrganizationUserService } from './organization_user.service';
import { OrganizationUserController } from './organization_user.controller';
import { OrganizationUserRepo } from './organization_user.repo';
import { KnexService } from 'src/config/config.knex';

@Module({
  providers: [OrganizationUserService, OrganizationUserRepo, KnexService],
  controllers: [OrganizationUserController]
})
export class OrganizationUserModule {}
