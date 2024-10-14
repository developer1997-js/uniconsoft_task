import { Body, Controller, Get, Post, Query } from '@nestjs/common';
import { EmployeeTasksService } from './employee_tasks.service';
import { AcceptAndDoneTaskEmployeeQueryDto, EmployeeTasksUserQueryDto } from './employee_tasks.dto';
import { ApiOperation, ApiTags } from '@nestjs/swagger';

@ApiTags('Employee Tasks (Tashkilot xodimi role uchun)')
@Controller('employee-tasks')
export class EmployeeTasksController {
    constructor(private readonly employeeTasksService: EmployeeTasksService) { }


    @Get('/tasks-user')
    @ApiOperation({ summary: 'Shu xodimga biriktirilgan barcha vazifalarni loyihalar va statuslar kesmida ro\'yxati' })
    async getTasksUser(
        @Query() query: EmployeeTasksUserQueryDto
    ) {
        return await this.employeeTasksService.getTasksUser(query);
    }

    @Get('/accept-and-done-task-by-employee')
    @ApiOperation({ summary: 'Vazifani qabul qilish va bajarish (bajarish vaqtini hisobga olish)' })
    async acceptAndDoneTaskEmployee(
        @Query() query: AcceptAndDoneTaskEmployeeQueryDto
    ) {
        return await this.employeeTasksService.acceptAndDoneTaskEmployee(query);
    }
}
