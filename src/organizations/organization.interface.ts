export  interface IOrganization {
    id: string
    title: string
    created_by: string
    limit: number
    page: number
 }

export type ICreateOrganization = Pick<IOrganization, 'title' | 'created_by'>
export type IUpdateOrganization = Pick<IOrganization, 'title'>
export type IGetOrganizationQuery = Pick<IOrganization, 'limit' | 'page'>

