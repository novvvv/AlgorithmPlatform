export type AuthorityName = 'ADMIN' | 'USER';

export interface IAuthority {
  authorityName: AuthorityName;
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
