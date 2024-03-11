import { Prisma, User } from '@saas-monorepo/database';

export interface GetUserByIdPayload {
  userId: string;
}
export interface getAllUsersPayload {}
export interface deleteUserByIdPayload {
  userId: string;
}
export interface updateUserPayload {
  userId: string;
  email: string;
  fullname: string;
}
