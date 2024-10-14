import { ApiProperty, PickType } from "@nestjs/swagger"
import { IOrganizationUser } from "./organization_user.interface"
import { IsNotEmpty, IsString } from "class-validator"

export class OrganizationUserDto implements IOrganizationUser {
    id: string
    org_id: string
    user_id: string
    created_by: string
    limit: number
    page: number

 }

 export class CreateOrganizationUserDto extends PickType(OrganizationUserDto, ['org_id', 'user_id', 'created_by']){
    @ApiProperty({
        example: 'af7c1fe6-d669-414e-b066-e9733f0de712'
    })
	@IsString()
	@IsNotEmpty()
	org_id: string

    @ApiProperty({
        example: 'af7c1fe6-d669-414e-b066-e9733f0de7a9'
    })
	@IsString()
	@IsNotEmpty()
	user_id: string

    @ApiProperty({
        example: '2977506a-8ad9-4f10-9a71-0f6ab9ced0df'
    })
	@IsString()
	@IsNotEmpty()
	created_by: string
 }

 export class GetOrganizationUserQueryDto extends PickType(OrganizationUserDto, ['limit', 'page']){
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

 export class UpdateOrganizationUserDto extends PickType(OrganizationUserDto, ['org_id', 'user_id']){
    @ApiProperty({
        example: 'af7c1fe6-d669-414e-b066-e9733f0de712'
    })
	@IsString()
	@IsNotEmpty()
	org_id: string

    @ApiProperty({
        example: 'af7c1fe6-d669-414e-b066-e9733f0de7a9'
    })
	@IsString()
	@IsNotEmpty()
	user_id: string

 }