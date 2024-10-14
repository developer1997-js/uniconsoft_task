import { Injectable } from '@nestjs/common';
import { uuid } from 'uuidv4';
import { BaseRepo } from 'src/config/BaseRepo';
import { CreateAndUpdateUserDto } from './dto/users.dto';
import { IChangeRole, ICreateAndUpdateUser, IDeleteUser, IGetUsersQuery, IUpdateUser } from './dto/users.interface';

@Injectable()
export class UsersRepo extends BaseRepo {
	
    getUsers(query: IGetUsersQuery) {
		const { limit, page } = query

		const offset = (page - 1) * limit
		const knex = this.knexService.instance;
		let result = knex.select(['*']).from('users');

		if(limit){
			result = result.limit(limit)
		}

		if(page){
			result = result.offset(offset)
		}

		return result
	}

	getUser(userId: string) {
		const knex = this.knexService.instance;
		return knex.select(['*']).from('users').where('id', userId).first();
	}

    createUser(user: CreateAndUpdateUserDto) {
		const knex = this.knexService.instance;
		return knex('users').insert({...user, id: uuid()}).returning('id');
	}

    deleteUser(userId: string) {
		const knex = this.knexService.instance;
		return knex('users').delete().where('id', userId);
	}

	updateUser(user:IUpdateUser, userId: string){
		const knex = this.knexService.instance;
		return knex('users').update(user).where('id', userId).returning('id')

	}

	changeRole(role:IChangeRole, userId: string){
		const knex = this.knexService.instance;
		return knex('users').update(role).where('id', userId).returning('id')

	}
}
