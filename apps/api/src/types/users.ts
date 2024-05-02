export interface User {
  id: string;
  email: string;
  password: string;
  full_name: string;
  create_at: Date;
  updated_at: Date;
}
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
