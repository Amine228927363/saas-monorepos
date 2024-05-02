export interface createTaskPayload {
  name: string;
  description: string;
  processId: string;
  CustomerId: string;
  status: Status;
  dueDate: Date;
  workspaceId: number;
}
export interface DeleteTaskPayload {
  taskId: string;
  customerId: string;
}
export type Status = 'ToDo' | 'InProgress' | 'Done';
export interface UpdateTaskPayload {
  name?: string;
  description?: string;
  status?: Status | undefined;
}
