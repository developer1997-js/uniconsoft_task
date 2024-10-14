import { Injectable } from "@nestjs/common";
import { BaseRepo } from "src/config/BaseRepo";
import { IAcceptAndDoneTaskEmployee, IGetEmployeeTasksUser } from "./employee_tasks.interface";

@Injectable()
export class EmployeeTasksRepo extends BaseRepo {
	
    getTasksUser(query: IGetEmployeeTasksUser) {
		const knex = this.knexService.instance;
		const { user_id, project_id, status, limit, page } = query;
		const offset = ( page - 1 ) * limit
		let tasks =  knex.select([
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
            .where('t.worker_user_id', user_id)

        if(project_id){
            tasks = tasks.where('t.project_id', project_id)
        }

        if(status){
            tasks = tasks.where('t.status', status)
        }

		if(limit){
			tasks = tasks.limit(limit)
		}

		if(page){
			tasks = tasks.offset(offset)
		}
		return tasks
	}


    acceptAndDoneTaskEmployee(task: IAcceptAndDoneTaskEmployee) {
        const { task_id, user_id, status } = task
        const knex = this.knexService.instance;
        return knex('tasks').update({status}).where({ id: task_id, worker_user_id: user_id }).returning('id')
    }

}