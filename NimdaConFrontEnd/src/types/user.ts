export type AuthorityName = 'ADMIN' | 'AUTHOR' | 'USER';

export interface IAuthority {
  authority_id: number;
  authority_name: AuthorityName;
}

export interface IUser {
  id: number;
  userId: string;
  userName: string;
  password?: string;  
  email: string;
  universityName?: string;
  department?: string;
  grade?: string;
}

export interface IUserDetail {
  id: number;
  userId: string;
  userName: string;
  password?: string;  
  email: string;
  universityName: string;
  department: string;
  grade: string;
}

export interface GetAllUsersResponse {
  success: boolean;
  users: IUser[];
  status?: number;
  message?: string;
}

export interface GetUserByIdResponse {
  success: boolean;
  user: IUser;
  status?: number;
  message?: string;
}

export interface GetUserByUserIdResponse {
  success: boolean;
  user: IUserDetail;
  status?: number;
  message?: string;
}

export interface GetUserByUserNameResponse {
  success: boolean;
  user: IUserDetail;
  status?: number;
  message?: string;
}

export interface DeleteUserResponse {
  success: boolean;
  message?: string;
  status?: number;
}

export interface UpdateUserRoleResponse {
  success: boolean;
  message?: string;
  status?: number;
}
