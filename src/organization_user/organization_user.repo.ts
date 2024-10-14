import { Injectable } from '@nestjs/common';
import { v4 } from 'uuid';
import { BaseRepo } from 'src/config/BaseRepo';
import { ICreateOrganizationUser, IGetOrganizationUserQuery, IUpdateOrganizationUser } from './organization_user.interface';

@Injectable()
export class OrganizationUserRepo extends BaseRepo {
	
    getOrganizationUsers(query: IGetOrganizationUserQuery) {
		const knex = this.knexService.instance;
    const { limit, page } = query;
    const offset = ( page - 1 ) * limit
		let organizationUsers = knex.select([
            'org_users.id',
            'org_users.org_id',
            'org.title as organization_title',
            knex.raw('json_agg(json_build_object(\'user_id\', u.id, \'user_name\', u.name)) as users')
          ])
          .from('organization_users as org_users')
          .join('organizations as org', 'org_users.org_id', 'org.id')
          .join('users as u', 'org_users.user_id', 'u.id')
          .groupBy('org_users.org_id', 'org.title', 'org_users.id');
    
    if(limit){
      organizationUsers = organizationUsers.limit(limit)
    }

    if(page){
      organizationUsers = organizationUsers.offset(offset)
    }

    return organizationUsers
	}

	getOrganizationUser(organizationUserId: string) {
		const knex = this.knexService.instance;
		return knex.select([
            'org_users.id',
            'org_users.org_id',
            'org.title as organization_title',
            knex.raw('json_agg(json_build_object(\'user_id\', u.id, \'user_name\', u.name)) as users')
          ])
          .from('organization_users as org_users')
          .join('organizations as org', 'org_users.org_id', 'org.id')
          .join('users as u', 'org_users.user_id', 'u.id')
          .groupBy('org_users.id','org_users.org_id', 'org.title').where('org_users.id', organizationUserId).first();
	}

    createOrganizationUser(organizationUser: ICreateOrganizationUser) {
		const knex = this.knexService.instance;
		return knex('organization_users').insert({...organizationUser, id: v4()}).returning('id');

	}

    deleteOrganizationUser(organizationUserId: string) {
		const knex = this.knexService.instance;
		return knex('organization_users').delete().where('id', organizationUserId);
	}

	updateOrganizationUser(organizationUser:IUpdateOrganizationUser, organizationUserId: string){
		const knex = this.knexService.instance;
		return knex('organization_users').update(organizationUser).where('id', organizationUserId).returning('id')

	}
}
