import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { IAcceptAndDoneTaskEmployee, IGetEmployeeTasksUser } from './employee_tasks.interface';
import { EmployeeTasksRepo } from './employee_tasks.repo';

@Injectable()
export class EmployeeTasksService {
    constructor(private readonly employeeTasksRepo: EmployeeTasksRepo) { }


    async getTasksUser(query:IGetEmployeeTasksUser) {
        try {
            return await this.employeeTasksRepo.getTasksUser(query);
        } catch (error) {
            throw new HttpException(
                `Failed to retrieve employee tasks: ${error.message || 'Internal Server Error'}`,
                HttpStatus.INTERNAL_SERVER_ERROR
            );
        }
    }

    async acceptAndDoneTaskEmployee(query:IAcceptAndDoneTaskEmployee) {
        try {
            return await this.employeeTasksRepo.acceptAndDoneTaskEmployee(query);
        } catch (error) {
            throw new HttpException(
                `Failed to retrieve employee accept: ${error.message || 'Internal Server Error'}`,
                HttpStatus.INTERNAL_SERVER_ERROR
            );
        }
    }

}

