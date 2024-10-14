import { Body, Controller, Delete, Get, Param, Post, Put, Query } from '@nestjs/common';
import { ProjectService } from './project.service';
import { CreateProjectDto, GetProjectsQueryDto, UpdateProjectDto } from './project.dto';
import { ApiTags } from '@nestjs/swagger';

@ApiTags('Projects (Tashkilot rahbari role uchun)')
@Controller('projects')
export class ProjectController {
    constructor(private readonly projectService: ProjectService) { }

    @Get()
    async getProjects(
        @Query() query:GetProjectsQueryDto
    ) {
        return await this.projectService.getProjects(query);
    }

    @Get(':id')
    async getProject(@Param('id') id: string ) {
        return await this.projectService.getProject(id);
    }

    @Post('/create')
    async createProject(
        @Body() project: CreateProjectDto
    ) {
        return await this.projectService.createProject(project);
    }

    @Delete('/delete/:id')
    async deleteProject(
        @Param('id') id: string
    ) {
        return await this.projectService.deleteProject(id);
    }

    @Put('update/:id')
    async updateProject(
        @Body() project: UpdateProjectDto ,
        @Param('id') id: string
    ) {
        return await this.projectService.updateProject(project, id);
    }

}
