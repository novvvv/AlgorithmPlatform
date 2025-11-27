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

export type GetUserByIdResponse = IUserDetail;

export interface GetUserByUserIdResponse {
  id: number;
  userId: string;
  userName: string;
  email: string;
}

export type GetUserByUserNameResponse = GetUserByUserIdResponse;

export interface getCurrentUserResponse {
  user: IUser; 
  message?: string;
}

// export interface DeleteUserResponse {
//   success: boolean;
//   message?: string;
//   status?: number;
// }

// export interface UpdateUserRoleResponse {
//   success: boolean;
//   message?: string;
//   status?: number;
// }
