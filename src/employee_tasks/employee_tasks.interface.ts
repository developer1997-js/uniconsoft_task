export  interface IEmployeeTasks {
    task_id: string
    user_id: string
    project_id: string
    status: string
    limit: number
    page: number
 }

export type IGetEmployeeTasksUser = Pick<IEmployeeTasks, 'user_id' | 'project_id' | 'status' | 'limit' | 'page'>
export type IAcceptAndDoneTaskEmployee = Pick<IEmployeeTasks, 'task_id' | 'user_id' | 'status' >