import type { IUser } from './user';

export interface LoginRequest {
  userId: string;
  password: string;
}

export interface LoginResponse {
  accessToken: string;  
  user: {
    id: number;
    userId: string;
    userName: string;
    email: string;
  };
}

export interface RegisterRequest {
  userId: string;         
  userName: string;         
  password: string;
  email: string;
  universityName: string;   
  department: string;      
  grade: string;            
}

export type RegisterResponse = IUser;