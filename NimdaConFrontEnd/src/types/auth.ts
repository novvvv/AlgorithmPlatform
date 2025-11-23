// types/auth.ts
export interface ILoginRequest {
  userId: string;
  password: string;
}

export interface ILoginResponse {
  success: boolean;
  message: string;
  token?: string;
  user?: {
    id: number;
    userId: string;
    userName: string;
    email: string;
  };
}

export interface IRegisterRequest {
  userId: string;
  userName: string;
  password: string;
  email: string;
}