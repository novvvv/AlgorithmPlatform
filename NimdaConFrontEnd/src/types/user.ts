export interface IUser {
  id: number;
  userId: string;
  nickname: string;
  password?: string;  // 보안상 응답에 포함되지 않을 수 있음
  email: string;
  universityName: string | null;
  department: string | null;
  grade: string | null;
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
