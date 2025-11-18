// User.ts
import type { IUser } from "./user";

// GroupMembership.ts (Enum/Type)
export type GroupRole = 'LEADER' | 'MEMBER';

// StudyGroup.ts
export interface IStudyGroup {
  group_id: number;
  group_name: string;
  description: string | null;
  goal: string | null;
  max_members: number;
  participation_code: string | null;
  is_public: boolean;
  created_by: number; // FK
  created_at: string;
  updated_at: string;
  // 관계
  current_members?: IGroupMembership[];
  creator?: IUser;
}

export interface IGroupMembership {
  membership_id: number;
  user_id: number; // FK
  group_id: number; // FK
  role: GroupRole;
  joined_at: string;
  left_at: string | null;
  // 관계
  user?: IUser;
}

//IGroupCreate
export interface IGroupCreateRequest {
  groupName: string;
  description?: string;
}


//IGroupJoin
export interface IGroupJoinRequest {
  userId: number;
  role: 'LEADER' | 'MEMBER' | string; 
  participationCode: string;
}
export interface IGroupJoinResponse {
  membershipId: number;
  groupId: number;
  userId: number;
  username: string;
  role: 'LEADER' | 'MEMBER' | string;
  active: boolean;
  joinedAt: string;
  leftAt: string | null;
}

