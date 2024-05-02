import type { task } from './task'

export type Customer = {
  id: string
  name: string
  email: string
  organization: string
  workspaceId: number
  status: string
  createdAt: Date
}
export type customerBody = {
  name: string
  email: string
  organization: string
  status: 'New'
}
