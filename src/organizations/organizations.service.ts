import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { OrganizationRepo } from './organization.repo';
import { ICreateOrganization, IGetOrganizationQuery, IUpdateOrganization } from './organization.interface';

@Injectable()
export class OrganizationsService {
    constructor(private readonly organizationRepo: OrganizationRepo) { }

    async getOrganizations(query:IGetOrganizationQuery) {
        try {
            return await this.organizationRepo.getOrganizations(query);
        } catch (error) {
            throw new HttpException(
                `Failed to retrieve users: ${error.message || 'Internal Server Error'}`,
                HttpStatus.INTERNAL_SERVER_ERROR
            );
        }
    }
    

    async getOrganizationStatistic(orgId: string) {
        try {
            const user = await this.organizationRepo.getOrganization(orgId);
            if (!user) {
                throw new HttpException('Org not found', HttpStatus.NOT_FOUND);
            }
            return await this.organizationRepo.getOrganizationStatistic(orgId);
        } catch (error) {
            throw new HttpException(
                `Failed to retrieve org: ${error.message || 'Internal Server Error'}`,
                HttpStatus.INTERNAL_SERVER_ERROR
            );
        }
    }

    async getOrganizationProjectsStatistic(orgId: string) {
        try {
            const user = await this.organizationRepo.getOrganization(orgId);
            if (!user) {
                throw new HttpException('Org not found', HttpStatus.NOT_FOUND);
            }
            return await this.organizationRepo.getOrganizationProjectsStatistic(orgId);
        } catch (error) {
            throw new HttpException(
                `Failed to retrieve org: ${error.message || 'Internal Server Error'}`,
                HttpStatus.INTERNAL_SERVER_ERROR
            );
        }
    }

    async getAllStatistic() {
        try {
            return await this.organizationRepo.getAllStatistic();
        } catch (error) {
            throw new HttpException(
                `Failed to retrieve org: ${error.message || 'Internal Server Error'}`,
                HttpStatus.INTERNAL_SERVER_ERROR
            );
        }
    }

    async getOrganization(userId: string) {
        try {
            const user = await this.organizationRepo.getOrganization(userId);
            if (!user) {
                throw new HttpException('User not found', HttpStatus.NOT_FOUND);
            }
            return user;
        } catch (error) {
            throw new HttpException(
                `Failed to retrieve user: ${error.message || 'Internal Server Error'}`,
                HttpStatus.INTERNAL_SERVER_ERROR
            );
        }
    }
    

    async createOrganization(user: ICreateOrganization) {
        try {
            return await this.organizationRepo.createOrganization(user)
        } catch (err) {
            throw new HttpException(err, HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }

    async deleteOrganization(userId: string) {
        try {
            const findUser = await this.organizationRepo.getOrganization(userId);
            if (!findUser?.id) {
                throw new HttpException('User Not Found!', HttpStatus.NOT_FOUND);
            }
            return await this.organizationRepo.deleteOrganization(userId);            
        } catch (error) {
            if (error instanceof HttpException) {
                throw error;
            }
    
            throw new HttpException(
                `Failed to delete user: ${error.message || 'Internal Server Error'}`,
                HttpStatus.INTERNAL_SERVER_ERROR
            );
        }
    }
    

    async updateOrganization(user: IUpdateOrganization, userId: string) {
        try {
            return await this.organizationRepo.updateOrganization(user, userId);
        } catch (error) {
            if (error instanceof HttpException) {
                throw error;
            }
    
            throw new HttpException(
                `Failed to update organization: ${error.message || 'Internal Server Error'}`,
                HttpStatus.INTERNAL_SERVER_ERROR
            );
        }
    }
    
}
