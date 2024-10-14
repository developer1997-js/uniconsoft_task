import { Body, Controller, Delete, Get, Param, Post, Put, Query } from '@nestjs/common';
import { UsersService } from './users.service';
import { ApiTags } from '@nestjs/swagger';
import { ChangeRoleDto, CreateAndUpdateUserDto, GetUserQueryDto, UpdateUserDto, UserIdDto } from './dto/users.dto';

@ApiTags('Users (Admin role uchun)')
@Controller('users')
export class UsersController {
    constructor(private readonly usersService: UsersService) { }

    @Get()
    async getUsers(
        @Query() query: GetUserQueryDto
    ) {
        return await this.usersService.getUsers(query);
    }

    @Get(':id')
    async getUser(@Param('id') id: string ) {
        return await this.usersService.getUser(id);
    }

    @Post('/create')
    async createUser(
        @Body() user: CreateAndUpdateUserDto
    ) {
        return await this.usersService.createUser(user);
    }

    @Delete('/delete/:id')
    async deleteUser(
        @Param('id') id: string
    ) {
        return await this.usersService.deleteUser(id);
    }

    @Put('update/:id')
    async updateUser(
        @Body() user: UpdateUserDto,
        @Param('id') id: string
    ) {
        return await this.usersService.updateUser(user, id);
    }

    @Put('change-role/:id')
    async changeRole(
        @Body() role: ChangeRoleDto,
        @Param('id') id: string
    ) {
        return await this.usersService.changeRole(role, id);
    }
}
