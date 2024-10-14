import { Injectable } from '@nestjs/common';
import { v4 } from 'uuid';
import { BaseRepo } from 'src/config/BaseRepo';
import { IChangeStatusTask, ICreateTasks, IGetTasksByUser, IGetTasksForUserQuery, IGetTasksQuery, IUpdateTasks } from './tasks.interface';

@Injectable()
export class TasksRepo extends BaseRepo {

    getTasks(query: IGetTasksQuery) {
        const { limit, page } = query
        const offset = (page - 1) * limit
        const knex = this.knexService.instance;
        let result = knex.select([
            't.id',
            't.status',
            't.done_at',
            't.due_date',
            knex.raw('json_build_object(\'org_id\', o.id, \'org_title\', o.title) as organization'),
            knex.raw('json_build_object(\'project_id\', p.id, \'title\', p.title) as project'),
            knex.raw('json_build_object(\'user_id\', u.id, \'user_name\', u.name) as worker_user'),
        ])
            .from('tasks as t')
            .join('users as u', 't.worker_user_id', 'u.id')
            .join('projects as p', 't.project_id', 'p.id')
            .join('organizations as o', 'p.org_id', 'o.id')

        if(limit){
            result = result.limit(limit)
        }

        if(page){
            result = result.offset(offset)
        }

        return result
    }

    getTask(taskId: string) {
        const knex = this.knexService.instance;
        return knex.select([
            't.id',
            't.status',
            't.done_at',
            't.due_date',
            knex.raw('json_build_object(\'org_id\', o.id, \'org_title\', o.title) as organization'),
            knex.raw('json_build_object(\'project_id\', p.id, \'title\', p.title) as project'),
            knex.raw('json_build_object(\'user_id\', u.id, \'user_name\', u.name) as worker_user'),
        ])
            .from('tasks as t')
            .join('users as u', 't.worker_user_id', 'u.id')
            .join('projects as p', 't.project_id', 'p.id')
            .join('organizations as o', 'p.org_id', 'o.id')
            .where('t.id', taskId).first();
    }
   

    createTask(task: ICreateTasks) {
        const knex = this.knexService.instance;
        return knex('tasks').insert({ ...task, id: v4(), created_at: new Date(), done_at: '' }).returning('id');
    }

    deleteTask(taskId: string) {
        const knex = this.knexService.instance;
        return knex('tasks').delete().where('id', taskId);
    }

    updateTask(task: IUpdateTasks, taskId: string) {
        const knex = this.knexService.instance;
        return knex('tasks').update(task).where('id', taskId).returning('id')
    }

    changeTaskStatus({status, worker_user_id}: IChangeStatusTask, taskId: string) {
        const knex = this.knexService.instance;
        return knex('tasks').update({status: status}).where({id:taskId, worker_user_id}).returning('id')
    }

}
