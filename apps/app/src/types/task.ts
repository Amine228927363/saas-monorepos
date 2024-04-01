export type task = {
  id: number
  name: string
  description?: string | null
  processId?: number | null
  assignedTo?: string | null
  CustomerId?: string | null
  completed: boolean
}
export type taskBody = {
  name: string
  description?: string | null
  processId?: number | null
  assignedTo?: string | null
  CustomerId?: string | null
  completed: boolean
}
