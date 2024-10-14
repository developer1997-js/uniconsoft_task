import { Module } from '@nestjs/common';
import { OrganizationsController } from './organizations.controller';
import { OrganizationsService } from './organizations.service';
import { OrganizationRepo } from './organization.repo';
import { KnexService } from 'src/config/config.knex';

@Module({
  controllers: [OrganizationsController],
  providers: [OrganizationsService, OrganizationRepo, KnexService]
})
export class OrganizationsModule {}
