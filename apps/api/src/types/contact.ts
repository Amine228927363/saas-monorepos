import { ContactInfo } from '@saas-monorepo/database';

export type contactInfo = ContactInfo;
export interface createContactPayload {
  firstName: string;
  lastName: string;
  email: string;
  phoneNumber?: string;
  userId?: string;
}
export interface updateContact {
  id: number;
  firstName: string;
  lastName: string;
  email: string;
  phoneNumber?: string;
  userId?: string;
}
export interface deleteContact {
  id: number;
}
