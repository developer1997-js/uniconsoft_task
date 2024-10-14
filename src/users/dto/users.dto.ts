import { ApiProperty, PickType } from "@nestjs/swagger"
import { IsNotEmpty, IsNumber, IsString } from "class-validator"
import { UserRole } from "../users.enum"
import { IUsers } from "./users.interface"
 
 export class UserDto implements IUsers {
    id: string
    name: string
    role: string
    created_by: string
    limit: number
    page: number
 }

 export class CreateAndUpdateUserDto extends PickType(UserDto, ['name', 'role']){
    @ApiProperty({
        example: 'Anvar'
    })
	@IsString()
	@IsNotEmpty()
	name: string

    @ApiProperty({
        enum: UserRole,
        example: UserRole.EMPLOYEE
    })
	@IsString()
	@IsNotEmpty()
	role: string

    @ApiProperty({
        example: '2977506a-8ad9-4f10-9a71-0f6ab9ced0df'
    })
	@IsString()
	@IsNotEmpty()
	created_by: string
 }

 export class UpdateUserDto extends PickType(UserDto, ['name', 'role']){
    @ApiProperty({
        example: 'Anvar'
    })
	@IsString()
	@IsNotEmpty()
	name: string

    @ApiProperty({
        enum: UserRole,
        example: UserRole.EMPLOYEE
    })
	@IsString()
	@IsNotEmpty()
	role: string
 }

 export class ChangeRoleDto extends PickType(UserDto, ['role']){
    @ApiProperty({
        enum: UserRole,
        example: UserRole.LEADER
    })
	@IsString()
	@IsNotEmpty()
	role: string
 }

 export class UserIdDto extends PickType(UserDto, ['id']){
    @ApiProperty({
        example: 'af7c1fe6-d669-414e-b066-e9733f0de7a2'
    })
	@IsString()
	@IsNotEmpty()
	id: string

 }


 export class GetUserQueryDto{
    @ApiProperty({
        example: 10
    })
	@IsNumber()
	@IsNotEmpty()
	limit: number

    @ApiProperty({
        example: 1
    })
	@IsNumber()
	@IsNotEmpty()
	page: number
}

