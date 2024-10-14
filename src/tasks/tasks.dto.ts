import { ApiProperty, PickType } from "@nestjs/swagger"
import { ITasks } from "./tasks.interface"
import { IsNotEmpty, IsOptional, IsString } from "class-validator"

export class TasksDto implements ITasks {
    id: string
    created_by: string
    created_at: string
    project_id: string
    due_date: string
    worker_user_id: string
    status: string
    done_at: string
    limit: number
    page: number
 
}

export class CreateTaskDto extends PickType(TasksDto, ['created_by', 'project_id',  'due_date', 'worker_user_id', 'status']) {
    @ApiProperty({
        example: 'af7c1fe6-d669-414e-b066-e9733f0de7dfs'
    })
    @IsString()
    @IsNotEmpty()
    project_id: string

    @ApiProperty({
        example: 'af7c1fe6-d669-414e-b066-e9733f0de7dfs'
    })
    @IsString()
    @IsNotEmpty()
    worker_user_id: string

    @ApiProperty({
        example: 'CREATED'
    })
    @IsString()
    @IsNotEmpty()
    status: string

    @ApiProperty({
        example: new Date()
    })
    @IsString()
    @IsNotEmpty()
    due_date: string

    @ApiProperty({
        example: '2977506a-8ad9-4f10-9a71-0f6ab9ced0df'
    })
    @IsString()
    @IsNotEmpty()
    created_by: string
}

export class GetTaskByUserDto {
    @ApiProperty({
        example: 'af7c1fe6-d669-414e-b066-e9733f0de7dfs'
    })
    @IsString()
    @IsNotEmpty()
    userId: string

    @ApiProperty({
        example: 'DONE'
    })
    @IsString()
    @IsNotEmpty()
    status: string
}

export class GetTasksQueryDto {
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

export class GetTasksForUserQueryDto {
    @ApiProperty({
        required: false
    })
    @IsOptional()
    @IsString()
    status?: string
}



export class UpdateTaskDto extends PickType(TasksDto, ['project_id',  'due_date', 'worker_user_id', 'status']) {
    @ApiProperty({
        example: 'af7c1fe6-d669-414e-b066-e9733f0de7dfs'
    })
    @IsString()
    @IsNotEmpty()
    project_id: string

    @ApiProperty({
        example: 'af7c1fe6-d669-414e-b066-e9733f0de7dfs'
    })
    @IsString()
    @IsNotEmpty()
    worker_user_id: string

    @ApiProperty({
        example: 'CREATED'
    })
    @IsString()
    @IsNotEmpty()
    status: string

    @ApiProperty({
        example: new Date()
    })
    @IsString()
    @IsNotEmpty()
    due_date: string
}

export class ChangeTaskStatusDto extends PickType(TasksDto, ['status', 'worker_user_id']) {
    @ApiProperty({
        example: 'CREATED'
    })
    @IsString()
    @IsNotEmpty()
    status: string

    @ApiProperty({
        example: '3753bcf9-18a0-4402-8b1a-6a0d52418a51'
    })
    @IsString()
    @IsNotEmpty()
    worker_user_id: string
}