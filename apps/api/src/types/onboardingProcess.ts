import { Customer, Task, User } from '@saas-monorepo/database';

export interface createOnbordProc {
  step: string;
  completed?: boolean;
  dueDate?: Date;
}
export interface updateOnboardProc {
  id: string;
  step: string;
  completed: boolean;
  dueDate: Date;
}
