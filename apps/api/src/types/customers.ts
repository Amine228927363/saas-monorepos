import { Task } from '@saas-monorepo/database';

import { onboardingProc } from './onboardingProcess.js';

export interface updateCustomerPayload {
  id?: string;
  email?: string;
  name?: string;
  status?: string;
  organization?: string;
  onboardingProcessID?: number;
  userId?: string;
  task?: Task[];
}
export interface createCustomerPayload {
  email: string;
  name: string;
  status: string;
  organization: string;
  onboardingProcess: onboardingProc;
}
export interface Customer {
  id: string;
  email: string;
  name: string;
  status: string;
  organization?: string;
  onboardingProcess: onboardingProc;
}
