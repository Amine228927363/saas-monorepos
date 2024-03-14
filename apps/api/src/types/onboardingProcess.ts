import { Customer, Task, User } from '@saas-monorepo/database';

export interface createOnbordProc {
  step: string;
  customerid: string;
  completed?: boolean;
  dueDate?: Date;
  tasks?: Task[];
  user?: User;
}
export interface updateOnboardProc {
  id: string;
  step: string;
  customerid: string;
  user?: User;
  completed: boolean;
  dueDate: Date;
}
