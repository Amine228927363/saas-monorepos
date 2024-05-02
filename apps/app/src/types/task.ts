export type task = {
  id: number
  name: string
  description?: string | null
  processId?: number | null
  CustomerId?: string | null
  status?: string
  dueDate?: Date | null
  workspaceId?: number | null
}
export type taskBody = {
  name: string
  description?: string | null
  processId?: number | null
  CustomerId?: string | null
  dueDate?: Date | null
  workspaceId?: number | null
}
export enum Status {
  ToDo = 'ToDo',
  InProgress = 'InProgress',
  Done = 'Done'
}
