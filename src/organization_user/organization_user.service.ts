import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { OrganizationUserRepo } from './organization_user.repo';
import { ICreateOrganizationUser, IGetOrganizationUserQuery, IUpdateOrganizationUser } from './organization_user.interface';

@Injectable()
export class OrganizationUserService {
    constructor(private readonly organizationUserRepo: OrganizationUserRepo) { }

    async getOrganizationUsers(query: IGetOrganizationUserQuery) {
        try {
            return await this.organizationUserRepo.getOrganizationUsers(query);
        } catch (error) {
            throw new HttpException(
                `Failed to retrieve users: ${error.message || 'Internal Server Error'}`,
                HttpStatus.INTERNAL_SERVER_ERROR
            );
        }
    }
    

    async getOrganizationUser(userId: string) {
        try {
            const user = await this.organizationUserRepo.getOrganizationUser(userId);
            if (!user) {
                throw new HttpException('Organization not found', HttpStatus.NOT_FOUND);
            }
            return user;
        } catch (error) {
            throw new HttpException(
                `Failed to retrieve Organization: ${error.message || 'Internal Server Error'}`,
                HttpStatus.NOT_FOUND
            );
        }
    }
    

    async createOrganizationUser(user: ICreateOrganizationUser) {
        try {
            return await this.organizationUserRepo.createOrganizationUser(user)
        } catch (err) {
            throw new HttpException(err, HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }

    async deleteOrganizationUser(userId: string) {
        try {
            const findUser = await this.organizationUserRepo.getOrganizationUser(userId);
            if (!findUser?.id) {
                throw new HttpException('Organization User Not Found!', HttpStatus.NOT_FOUND);
            }
             await this.organizationUserRepo.deleteOrganizationUser(userId); 
             return{
                msg: 'Organization user is deleted!'
             }           
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
    

    async updateOrganizationUser(organizationUser: IUpdateOrganizationUser, organizationUserId: string) {
        try {
            const findUser = await this.organizationUserRepo.getOrganizationUser(organizationUserId);
            if (!findUser?.id) {
                throw new HttpException('User Not Found!', HttpStatus.NOT_FOUND);
            }
            return await this.organizationUserRepo.updateOrganizationUser(organizationUser, organizationUserId);
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
