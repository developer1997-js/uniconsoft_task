import { Injectable } from '@nestjs/common';
import { v4 } from 'uuid';
import { BaseRepo } from 'src/config/BaseRepo';
import { ICreateOrganization, IGetOrganizationQuery, IUpdateOrganization } from './organization.interface';

@Injectable()
export class OrganizationRepo extends BaseRepo {

	getOrganizations(query: IGetOrganizationQuery) {
		const knex = this.knexService.instance;
		const { limit, page } = query;
		const offset = (page - 1) * limit
		let organizations = knex.select(['*']).from('organizations');

		if (limit) {
			organizations = organizations.limit(limit)
		}

		if (page) {
			organizations = organizations.offset(offset)
		}
		return organizations
	}

	getOrganization(orgId: string) {
		const knex = this.knexService.instance;
		return knex.select(['*']).from('organizations').where('id', orgId).first();
	}

	getOrganizationStatistic(orgId: string) {
		const knex = this.knexService.instance;
		return knex.select([
			'o.id',
			'o.title as org_title',
			knex.raw('COUNT(p.org_id) as project_count'),
			knex.raw('COUNT(t.project_id) as task_count'),
		]).from('organizations as o')
			.join('projects as p', 'o.id', 'p.org_id')
			.join('tasks as t', 't.project_id', 'p.id')
			.where('o.id', orgId)
			.groupBy('o.id', 'o.title')
	}


	getOrganizationProjectsStatistic(orgId: string) {
		const knex = this.knexService.instance;

		return knex.select([
			'o.id',
			'o.title as org_title',
			knex.raw('json_build_object(\'project_id\', p.id, \'project_title\', p.title, \'task_count\', COUNT(t.project_id)) as projects'),
		]).from('organizations as o')
			.join('projects as p', 'o.id', 'p.org_id')
			.join('tasks as t', 't.project_id', 'p.id')
			.where('o.id', orgId)
			.groupBy('o.id', 'o.title', 'p.id', 'p.title')
	}

	getAllStatistic() {
		const knex = this.knexService.instance;

		return knex.select([
			knex.raw('COUNT(DISTINCT o.id) as total_organizations'),
			knex.raw('COUNT(DISTINCT p.id) as total_projects'),
			knex.raw('COUNT(DISTINCT t.id) as total_tasks')
		])
			.from('organizations as o')
			.leftJoin('projects as p', 'o.id', 'p.org_id')
			.leftJoin('tasks as t', 'p.id', 't.project_id')

	}

	createOrganization(organization: ICreateOrganization) {
		const knex = this.knexService.instance;
		return knex('organizations').insert({ ...organization, id: v4() }).returning('id');
	}

	deleteOrganization(userId: string) {
		const knex = this.knexService.instance;
		return knex('organizations').delete().where('id', userId);
	}

	updateOrganization(user: IUpdateOrganization, userId: string) {
		const knex = this.knexService.instance;
		return knex('organizations').update(user).where('id', userId).returning('id')

	}
}
