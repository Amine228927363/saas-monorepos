import { Task } from '@saas-monorepo/database';

import { Workspace } from './Workspace.js';
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
  workspace?: Workspace;
}
export interface createCustomerPayload {
  email: string;
  name: string;
  status: string;
  organization: string;
  onboardingProcess: onboardingProc;
  workspaceId: number;
}
export interface Customer {
  id: string;
  email: string;
  name: string;
  status: string;
  organization?: string;
  onboardingProcess: onboardingProc;
  workspaceId: number;
}
