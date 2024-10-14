export  interface ITasks {
    id:string 
    created_by:string 
    created_at:string 
    project_id?:string 
    due_date?:string 
    worker_user_id?:string 
    status?:string 
    done_at:string
    limit: number
    page: number
 }

export type ICreateTasks = Pick<ITasks, 'created_by' | 'project_id' | 'due_date' | 'status' | 'worker_user_id'>
export type IUpdateTasks = Pick<ITasks, 'project_id' | 'due_date' | 'status' | 'worker_user_id'>
export type IGetTasksByUser = Pick<ITasks, 'status' | 'worker_user_id'>
export type IChangeStatusTask = Pick<ITasks, 'status' | 'worker_user_id'>
export type IGetTasksQuery = Pick<ITasks, 'limit' | 'page'>
export type IGetTasksForUserQuery = Pick<ITasks, 'status'>