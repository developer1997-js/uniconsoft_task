import { Injectable } from '@nestjs/common';
import { v4 } from 'uuid';
import { BaseRepo } from 'src/config/BaseRepo';
import { ICreateProject, IGetProjectsQuery, IUpdateProject } from './project.interface';

@Injectable()
export class ProjectRepo extends BaseRepo {

    getProjects(query: IGetProjectsQuery) {
        const knex = this.knexService.instance;
        const { limit, page } = query;
        const offset = (page - 1) * limit
        let projects = knex.select([
            'p.id',
            'p.title',
            'org.title as organization_title'
        ])
            .from('projects as p')
            .join('organizations as org', 'p.org_id', 'org.id');

        if(limit){
            projects = projects.limit(limit)
        }

        if(page){
            projects = projects.offset(offset)
        }
        return projects
    }

    getProject(projectId: string) {
        const knex = this.knexService.instance;
        return knex.select([
            'p.id',
            'org.title as organization_title'
        ])
            .from('projects as p')
            .join('organizations as org', 'p.org_id', 'org.id')
            .where('p.id', projectId).first();
    }

    createProject(project: ICreateProject) {
        const knex = this.knexService.instance;
        return knex('projects').insert({ ...project, id: v4() }).returning('id');
    }

    deleteProject(projectId: string) {
        const knex = this.knexService.instance;
        return knex('projects').delete().where('id', projectId);
    }

    updateProject(project: IUpdateProject, projectId: string) {
        const knex = this.knexService.instance;
        return knex('projects').update(project).where('id', projectId).returning('id')
    }
}
