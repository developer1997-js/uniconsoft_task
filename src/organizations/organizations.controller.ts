import { Body, Controller, Delete, Get, Param, Post, Put, Query } from '@nestjs/common';
import { OrganizationsService } from './organizations.service';
import { CreateOrganizationDto, GetOrganizationQueryDto, UpdateOrganizationDto } from './organization.dto';
import { ApiOperation, ApiTags } from '@nestjs/swagger';

@ApiTags('organizations (Admin role uchun)')
@Controller('organizations')
export class OrganizationsController {
    constructor(private readonly organizationsService: OrganizationsService) { }


    @Get('/all-statistic')
    @ApiOperation({ summary: 'Umumiy statistika (umumiy tashkilotlar soni, umumiy loyihalar soni, umumiy vazifalar soni)' })
    async getAllStatistic() {
        return await this.organizationsService.getAllStatistic();
    }

    @Get()
    async getOrganizations(
        @Query() query:GetOrganizationQueryDto
    ) {
        return await this.organizationsService.getOrganizations(query);
    }

    @Get(':id')
    async getOrganization(@Param('id') id: string ) {
        return await this.organizationsService.getOrganization(id);
    }

    @Get('/statistic/:id')
    @ApiOperation({ summary: 'Tashkilot kesmida statistika: (tashkilot nomi, loyihalar soni, umumiy vazifalar soni)' })
    async getOrganizationStatistic(@Param('id') id: string ) {
        return await this.organizationsService.getOrganizationStatistic(id);
    }

    @Get('/projects/statistic/:id')
    @ApiOperation({ summary: 'Tashkilotning loyihalari kesmida: (tashkilot nomi, loyiha nomi, loyiha vazifalari soni)' })
    async getOrganizationProjectsStatistic(@Param('id') id: string ) {
        return await this.organizationsService.getOrganizationProjectsStatistic(id);
    }

    @Post('/create')
    async createOrganization(
        @Body() organization: CreateOrganizationDto
    ) {
        return await this.organizationsService.createOrganization(organization);
    }

    @Delete('/delete/:id')
    async deleteOrganization(
        @Param('id') id: string
    ) {
        return await this.organizationsService.deleteOrganization(id);
    }

    @Put('update/:id')
    async updateOrganization(
        @Body() organization: UpdateOrganizationDto,
        @Param('id') id: string
    ) {
        return await this.organizationsService.updateOrganization(organization, id);
    }
}
