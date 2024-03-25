export interface createTaskPayload {
  id: string;
  name: string;
  description: string;
  processId: string;
  assignedTo: string;
  CustomerId: string;
  completed: boolean;
}
export interface DeleteTaskPayload {
  taskId: string;
  customerId: string;
}

export interface UpdateTaskPayload {
  taskId: string;
  name?: string;
  description?: string;
  processId?: string;
  assignedTo?: string;
  customerId?: string;
  completed?: boolean;
}
