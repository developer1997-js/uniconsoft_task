import { ApiProperty, PickType } from "@nestjs/swagger"
import { IProject } from "./project.interface"
import { IsNotEmpty, IsString } from "class-validator"

export class ProjectDto implements IProject {
    id: string
    org_id: string
    title: string
    created_by: string
    limit: number
    page: number
}

export class CreateProjectDto extends PickType(ProjectDto, ['title', 'org_id', 'created_by']) {
    @ApiProperty({
        example: 'Loyiha 1'
    })
    @IsString()
    @IsNotEmpty()
    title: string

    @ApiProperty({
        example: 'af7c1fe6-d669-414e-b066-e9733f0de7dfs'
    })
    @IsString()
    @IsNotEmpty()
    org_id: string

    @ApiProperty({
        example: '2977506a-8ad9-4f10-9a71-0f6ab9ced0df'
    })
    @IsString()
    @IsNotEmpty()
    created_by: string
}

export class GetProjectsQueryDto extends PickType(ProjectDto, ['limit', 'page']){
    @ApiProperty({
        example: 10
    })
    @IsString()
    @IsNotEmpty()
    limit: number

    @ApiProperty({
        example: 1
    })
    @IsString()
    @IsNotEmpty()
    page: number
}

export class UpdateProjectDto extends PickType(ProjectDto, ['org_id']) {
    @ApiProperty({
        example: 'af7c1fe6-d669-414e-b066-e9733f0de7dfs'
    })
    @IsString()
    @IsNotEmpty()
    org_id: string
}