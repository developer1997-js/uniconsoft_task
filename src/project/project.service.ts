import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { ProjectRepo } from './project.repo';
import { ICreateProject, IGetProjectsQuery, IUpdateProject } from './project.interface';

@Injectable()
export class ProjectService {
    constructor(private readonly projectRepo: ProjectRepo) { }

    async getProjects(query:IGetProjectsQuery) {
        try {
            return await this.projectRepo.getProjects(query);
        } catch (error) {
            throw new HttpException(
                `Failed to retrieve users: ${error.message || 'Internal Server Error'}`,
                HttpStatus.INTERNAL_SERVER_ERROR
            );
        }
    }
    

    async getProject(projectId: string) {
        try {
            const project = await this.projectRepo.getProject(projectId);
            if (!project) {
                throw new HttpException('Project not found', HttpStatus.NOT_FOUND);
            }
            return project;
        } catch (error) {
            throw new HttpException(
                `Failed to retrieve project: ${error.message || 'Internal Server Error'}`,
                HttpStatus.INTERNAL_SERVER_ERROR
            );
        }
    }
    

    async createProject(project: ICreateProject) {
        try {
            return await this.projectRepo.createProject(project)
        } catch (err) {
            throw new HttpException(err, HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }

    async deleteProject(projectId: string) {
        try {
            const findProject = await this.projectRepo.getProject(projectId);
            if (!findProject?.id) {
                throw new HttpException('Project Not Found!', HttpStatus.NOT_FOUND);
            }
            let result = await this.projectRepo.deleteProject(projectId);  
            
            return {
                result,
                msg: 'Project deleted'
            }
        } catch (error) {
            if (error instanceof HttpException) {
                throw error;
            }
    
            throw new HttpException(
                `Failed to delete project: ${error.message || 'Internal Server Error'}`,
                HttpStatus.INTERNAL_SERVER_ERROR
            );
        }
    }
    

    async updateProject(project: IUpdateProject, projectId: string) {
        try {
            const findProject = await this.projectRepo.getProject(projectId);
            if (!findProject?.id) {
                throw new HttpException('Project Not Found!', HttpStatus.NOT_FOUND);
            }
            return await this.projectRepo.updateProject(project, projectId);
        } catch (error) {
            if (error instanceof HttpException) {
                throw error;
            }
    
            throw new HttpException(
                `Failed to update project: ${error.message || 'Internal Server Error'}`,
                HttpStatus.INTERNAL_SERVER_ERROR
            );
        }
    }

}
