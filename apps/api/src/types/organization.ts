import { Customer } from '@saas-monorepo/database';

export interface createOrganization {
  id: string;
  name: string;
  email: string;
  phone: string;
  customers: string;
}
export interface updateOrganization {
  id: string;
  name: string;
  email: string;
  phone: string;
  customers: string;
}
