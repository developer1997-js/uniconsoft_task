export  interface IUsers {
    id: string
    name: string
    role: string
    created_by: string
    limit: number
    page: number
 }

export type ICreateAndUpdateUser = Pick<IUsers, 'name' | 'role' | 'created_by'>
export type IUpdateUser = Pick<IUsers, 'name' | 'role'>
export type IChangeRole = Pick<IUsers, 'role'>
export type IDeleteUser = Pick<IUsers, 'id'>
export type IGetUsersQuery = Pick<IUsers, 'limit' | 'page'>