import type { task } from './task'

export type Customer = {
  id: string
  name: string
  email: string
  organization: string
  status: 'Client Assignement'
  tasks: task[]
}
export type customerBody = {
  name: string
  email: string
  organization: string
  status: 'New'
}
