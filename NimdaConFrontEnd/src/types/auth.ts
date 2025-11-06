export interface LoginRequest {
  username: string;
  password: string;
}

export interface LoginResponse {
  success: boolean;
  message: string;
  token?: string;
  user?: {
    id: number;
    username: string;
    email: string;
  };
}

export interface RegisterRequest {
  username: string;
  password: string;
  email: string;
}