import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { TasksRepo } from './tasks.repo';
import { IChangeStatusTask, ICreateTasks, IGetTasksByUser, IGetTasksForUserQuery, IGetTasksQuery, IUpdateTasks } from './tasks.interface';

@Injectable()
export class TasksService {
    constructor(private readonly tasksRepo: TasksRepo) { }


    async getTasks(query:IGetTasksQuery) {
        try {
            return await this.tasksRepo.getTasks(query);
        } catch (error) {
            throw new HttpException(
                `Failed to retrieve tasks: ${error.message || 'Internal Server Error'}`,
                HttpStatus.INTERNAL_SERVER_ERROR
            );
        }
    }
    

    async getTask(taskId: string) {
        try {
            const task = await this.tasksRepo.getTask(taskId);
            if (!task) {
                throw new HttpException('Task not found', HttpStatus.NOT_FOUND);
            }
            return task;
        } catch (error) {
            throw new HttpException(
                `Failed to retrieve task: ${error.message || 'Internal Server Error'}`,
                HttpStatus.INTERNAL_SERVER_ERROR
            );
        }
    }    

    async createTask(task: ICreateTasks) {
        try {
            return await this.tasksRepo.createTask(task)
        } catch (err) {
            throw new HttpException(err, HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }

    async deleteTask(taskId: string) {
        try {
            const findTask = await this.tasksRepo.getTask(taskId);
            if (!findTask?.id) {
                throw new HttpException('Project Not Found!', HttpStatus.NOT_FOUND);
            }
            let result = await this.tasksRepo.deleteTask(taskId);  
            
            return {
                result,
                msg: 'Task deleted'
            }
        } catch (error) {
            if (error instanceof HttpException) {
                throw error;
            }
    
            throw new HttpException(
                `Failed to delete task: ${error.message || 'Internal Server Error'}`,
                HttpStatus.INTERNAL_SERVER_ERROR
            );
        }
    }
    

    async updateTask(task: IUpdateTasks, taskId: string) {
        try {
            const findTask = await this.tasksRepo.getTask(taskId);
            if (!findTask?.id) {
                throw new HttpException('Task Not Found!', HttpStatus.NOT_FOUND);
            }
            return await this.tasksRepo.updateTask(task, taskId);
        } catch (error) {
            if (error instanceof HttpException) {
                throw error;
            }
    
            throw new HttpException(
                `Failed to update task: ${error.message || 'Internal Server Error'}`,
                HttpStatus.INTERNAL_SERVER_ERROR
            );
        }
    }

    async changeTaskStatus(status: IChangeStatusTask, taskId: string) {
        try {
            const findTask = await this.tasksRepo.getTask(taskId);
            if (!findTask?.id) {
                throw new HttpException('Task Not Found!', HttpStatus.NOT_FOUND);
            }
            return await this.tasksRepo.changeTaskStatus(status, taskId);
        } catch (error) {
            if (error instanceof HttpException) {
                throw error;
            }
    
            throw new HttpException(
                `Failed to change status task: ${error.message || 'Internal Server Error'}`,
                HttpStatus.INTERNAL_SERVER_ERROR
            );
        }
    }


    
}
