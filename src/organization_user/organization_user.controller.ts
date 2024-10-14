import { Body, Controller, Delete, Get, Param, Post, Put, Query } from '@nestjs/common';
import { OrganizationUserService } from './organization_user.service';
import { ApiTags } from '@nestjs/swagger';
import { CreateAndUpdateUserDto } from 'src/users/dto/users.dto';
import { CreateOrganizationUserDto, GetOrganizationUserQueryDto, UpdateOrganizationUserDto } from './organization_user.dto';

@ApiTags('organization-user (Admin role uchun)')
@Controller('organization-user')
export class OrganizationUserController {
    constructor(private readonly organizationUserService: OrganizationUserService) { }

    @Get()
    async getOrganizationUsers(
        @Query() query: GetOrganizationUserQueryDto
    ) {
        return await this.organizationUserService.getOrganizationUsers(query);
    }

    @Get(':id')
    async getOrganizationUser(@Param('id') organizationUserId: string ) {
        return await this.organizationUserService.getOrganizationUser(organizationUserId);
    }

    @Post('/create')
    async createOrganizationUser(
        @Body() organizationUser: CreateOrganizationUserDto
    ) {
        return await this.organizationUserService.createOrganizationUser(organizationUser);
    }

    @Delete('/delete/:id')
    async deleteOrganizationUser(
        @Param('id') organizationUserId: string
    ) {
        return await this.organizationUserService.deleteOrganizationUser(organizationUserId);
    }

    @Put('update/:id')
    async updateOrganizationUser(
        @Body() organizationUser: UpdateOrganizationUserDto,
        @Param('id') organizationUserId: string
    ) {
        return await this.organizationUserService.updateOrganizationUser(organizationUser, organizationUserId);
    }
}

