import { ApiProperty, PickType } from "@nestjs/swagger"
import { IOrganization } from "./organization.interface"
import { IsNotEmpty, IsString } from "class-validator"

export class OrganizationDto implements IOrganization {
    id: string
    title: string
    created_by: string
    limit: number
    page: number
 }

 export class CreateOrganizationDto extends PickType(OrganizationDto, ['title', 'created_by']){
    @ApiProperty({
        example: 'Unicon Soft'
    })
	@IsString()
	@IsNotEmpty()
	title: string

    @ApiProperty({
        example: '2977506a-8ad9-4f10-9a71-0f6ab9ced0df'
    })
	@IsString()
	@IsNotEmpty()
	created_by: string
 }

 export class GetOrganizationQueryDto extends PickType(OrganizationDto, ['limit', 'page']){
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

 export class UpdateOrganizationDto extends PickType(OrganizationDto, ['title']){
    @ApiProperty({
        example: 'Unicon Soft'
    })
	@IsString()
	@IsNotEmpty()
	title: string

 }