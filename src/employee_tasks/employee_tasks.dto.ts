import { ApiProperty, PickType } from "@nestjs/swagger"
import { IEmployeeTasks } from "./employee_tasks.interface"
import { IsNotEmpty, IsOptional, IsString } from "class-validator"

export class EmployeeTasksDto implements IEmployeeTasks {
    task_id: string
    user_id: string
    project_id: string
    status: string
    limit: number
    page: number
 }

 export class EmployeeTasksUserQueryDto extends PickType(EmployeeTasksDto, ['user_id', 'project_id', 'status', 'limit', 'page']){
    @ApiProperty({
        example: '2977506a-8ad9-4f10-9a71-0f6ab9ced0dd'
    })
	@IsString()
	@IsNotEmpty()
	user_id: string

    @ApiProperty({
        required: false
    })
	@IsString()
	@IsOptional()
	project_id: string

    @ApiProperty({
        required: false
    })
	@IsString()
	@IsOptional()
	status: string

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

 export class AcceptAndDoneTaskEmployeeQueryDto extends PickType(EmployeeTasksDto, [ 'user_id', 'task_id', 'status']){
    @ApiProperty({
        example: '2977506a-8ad9-4f10-9a71-0f6ab9ced0dd'
    })
	@IsString()
	@IsNotEmpty()
	user_id: string

    @ApiProperty({
        example: '2977506a-8ad9-4yh0-9a71-0f6ab9ced0dd'
    })
	@IsString()
	@IsNotEmpty()
	task_id: string

    @ApiProperty({
        example: 'IN_PROCESS'
    })
	@IsString()
	@IsNotEmpty()
	status: string

}
