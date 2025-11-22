export interface User {
  id: number;
  userId: string;
  userName: string;
  email: string;
  universityName?: string | null;
  department?: string | null;
  grade?: string | null;
  role?: string;
}

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

export interface RegisterResponse {
  id: number;
  userId: string;
  userName: string;
  password: null; 
  email: string;
  universityName: string | null;
  department: string | null;
  grade: string | null;
}