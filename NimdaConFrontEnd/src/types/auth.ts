// types/auth.ts
export interface ILoginRequest {
  username: string;
  password: string;
}

export interface ILoginResponse {
  success: boolean;
  message: string;
  token?: string;
  user?: {
    id: number;
    username: string;
    email: string;
  };
}

export interface IRegisterRequest {
  username: string;
  password: string;
  email: string;
}