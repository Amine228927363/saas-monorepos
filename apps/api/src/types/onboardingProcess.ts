import { Customer, Task, User } from '@saas-monorepo/database';

export interface onboardingProc {
  id: string;
  step: string;
}
export interface createOnbordProc {
  step: string;
}
export interface updateOnboardProc {
  id: string;
  step: string;
}
