// Authority.ts (Enum/Type)
export type AuthorityName = 'ROLE_ADMIN' | 'ROLE_AUTHOR' | 'ROLE_USER';

export interface IAuthority {
  authority_id: number;
  authority_name: AuthorityName;
}

// User.ts (User Interface)
export interface IUser {
  user_id: number;
  email: string;
  password?: string; // 보안상 프론트엔드에서 받지 않거나, 옵셔널로 처리
  user_name: string;
  university_name: string | null; // VARCHAR(100)
  department: string | null;     // VARCHAR(100)
  grade: number | null;
  created_at: string; // TIMESTAMP는 보통 string (ISO 8601 형식)으로 처리
  updated_at: string;
  // 관계 (Join 결과를 받을 때 유용)
  authorities?: IAuthority[]; 
}

// UserAuthority.ts (중간 테이블은 API 통신 시 사용될 가능성이 낮으므로, User 인터페이스에 포함시키는 경우가 많습니다.)
// API 응답 형태에 따라 구조를 잡으시면 됩니다.