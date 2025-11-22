export type AuthorityName = 'ADMIN' | 'AUTHOR' | 'USER';

export interface IAuthority {
  authority_id: number;
  authority_name: AuthorityName;
}

export interface IUser {
  id: number;
  userId: number;
  userName: string;
  password?: string;  // 보안상 응답에 포함되지 않을 수 있음
  email: string;
  universityName: string | null;
  department: string | null;
  grade: string | null;
  createdAt: string;
  updatedAt: string;
  authorities?: IAuthority[]; 
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
