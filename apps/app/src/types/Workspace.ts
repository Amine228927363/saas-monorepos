import type { Customer } from './customer'
import type { User } from './users'
export type Workspace = {
  id: number
  name: string
  customers: Customer[] | null
  users: User[] | null
}
export type createWorkspace = {
  name: string
  customers?: Customer[] | null
  users?: User[] | null
}
