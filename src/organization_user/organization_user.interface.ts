export  interface IOrganizationUser {
    id: string
    org_id: string
    user_id: string
    created_by: string
    limit: number
    page: number
 }

export type ICreateOrganizationUser = Pick<IOrganizationUser, 'org_id' | 'user_id' | 'created_by'>
export type IUpdateOrganizationUser = Pick<IOrganizationUser, 'org_id' | 'user_id'>
export type IGetOrganizationUserQuery = Pick<IOrganizationUser, 'limit' | 'page'>