export  interface IProject {
    id: string
    org_id: string
    created_by: string
    limit: number
    page: number
 }

export type ICreateProject = Pick<IProject, 'org_id' | 'created_by'>
export type IUpdateProject = Pick<IProject, 'org_id'>
export type IGetProjectsQuery = Pick<IProject, 'limit' | 'page'>