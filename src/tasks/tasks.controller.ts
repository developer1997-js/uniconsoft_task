import { Body, Controller, Delete, Get, Param, Post, Put, Query } from '@nestjs/common';
import { TasksService } from './tasks.service';
import { ChangeTaskStatusDto, CreateTaskDto, GetTaskByUserDto, GetTasksForUserQueryDto, GetTasksQueryDto, UpdateTaskDto } from './tasks.dto';
import { ApiTags } from '@nestjs/swagger';

@ApiTags('Tasks (Tashkilot rahbari role uchun)')
@Controller('tasks')
export class TasksController {
    constructor(private readonly tasksService: TasksService) { }

    @Get()
    async getTasks(
        @Query() query:GetTasksQueryDto
    ) {
        return await this.tasksService.getTasks(query);
    }

    @Get(':id')
    async getTask(@Param('id') id: string ) {
        return await this.tasksService.getTask(id);
    }

    @Post('/create')
    async createTask(
        @Body() task: CreateTaskDto
    ) {
        return await this.tasksService.createTask(task);
    }

    @Delete('/delete/:id')
    async deleteTask(
        @Param('id') id: string
    ) {
        return await this.tasksService.deleteTask(id);
    }

    @Put('update/:id')
    async updateTask(
        @Body() task: UpdateTaskDto ,
        @Param('id') id: string
    ) {
        return await this.tasksService.updateTask(task, id);
    }

    @Put('change-task-status-for-user/:id')
    async changeTaskStatus(
        @Body() status: ChangeTaskStatusDto ,
        @Param('id') id: string
    ) {
        return await this.tasksService.changeTaskStatus(status, id);
    }
}
