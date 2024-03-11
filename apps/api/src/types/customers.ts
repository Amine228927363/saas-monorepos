import { Task } from '@saas-monorepo/database';

export interface updateCustomerPayload {
  email: string;
  name: string;
  organizationid?: string;
  userId?: string;
  task?: Task[];
}
