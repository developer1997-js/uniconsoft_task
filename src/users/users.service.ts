import { HttpException, HttpStatus, Injectable, NotFoundException } from '@nestjs/common';
import { UsersRepo } from './users.repo';
import { IChangeRole, ICreateAndUpdateUser, IDeleteUser, IGetUsersQuery, IUpdateUser } from './dto/users.interface';

@Injectable()
export class UsersService {
    constructor(private readonly appRepo: UsersRepo) { }

    async getUsers(query:IGetUsersQuery) {
        try {
            return await this.appRepo.getUsers(query);
        } catch (error) {
            throw new HttpException(
                `Failed to retrieve users: ${error.message || 'Internal Server Error'}`,
                HttpStatus.INTERNAL_SERVER_ERROR
            );
        }
    }
    

    async getUser(userId: string) {
        try {
            const user = await this.appRepo.getUser(userId);
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
    

    async createUser(user: ICreateAndUpdateUser) {
        try {
            return await this.appRepo.createUser(user)
        } catch (err) {
            throw new HttpException(err, HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }

    async deleteUser(userId: string) {
        try {
            const findUser = await this.appRepo.getUser(userId);
            if (!findUser?.id) {
                throw new HttpException('User Not Found!', HttpStatus.NOT_FOUND);
            }
    
            return await this.appRepo.deleteUser(userId);
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
    


    async updateUser(user: IUpdateUser, userId: string) {
        try {
            return await this.appRepo.updateUser(user, userId);
        } catch (error) {
            if (error instanceof HttpException) {
                throw error;
            }

            throw new HttpException(
                `Failed to update user: ${error.message || 'Internal Server Error'}`,
                HttpStatus.INTERNAL_SERVER_ERROR
            );
        }
    }

    async changeRole(role: IChangeRole, userId: string){
        try {
            const findUser = await this.appRepo.getUser(userId);
            if (!findUser?.id) {
                throw new HttpException('User Not Found!', HttpStatus.NOT_FOUND);
            }
             await this.appRepo.changeRole(role, userId);
             return {
                status: HttpStatus.OK,
                msg: 'User role change'
             }
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
