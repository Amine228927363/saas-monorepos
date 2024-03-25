import { Task } from '@saas-monorepo/database';

export interface updateCustomerPayload {
  id: string;
  email: string;
  name: string;
  status: string;
  organizationid?: string;
  userId?: string;
  task?: Task[];
}
export interface createCustomerPayload {
  email: string;
  name: string;
  status: string;
  organizationid?: string;
}
