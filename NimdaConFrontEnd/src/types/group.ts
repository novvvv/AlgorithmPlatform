export type GroupRole = 'LEADER' | 'MEMBER' | 'ADMIN';

export interface IStudyGroup {
  groupId: number;
  groupName: string;
  description?: string;
  goal?: string;
  maxMembers: number;
  participationCode?: string;
  isPublic: boolean;
  creatorUserId: number;
  createdAt: string;
  updatedAt: string;
  currentMembers?: IGroupMembership[];
}

export interface IGroupMembership {
  membershipId: number;
  groupId: number;
  userId: number;
  userName: string;
  role: GroupRole;
  active: boolean; // 탈퇴 시 soft delete에 사용될 수 있음
  joinedAt: string;
  leftAt: string | null;
}

export type GetAllGroupsResponse = IStudyGroup[];

export interface GetGroupCreateRequest {
  groupName: string;
  description?: string;
  goal?: string;
  maxMembers: number;
  isPublic: boolean;
  creatorUserId: number; 
  participationCode?: string; 
}

export interface GetGroupCreateResponse {
  groupId: number;
  groupName: string;
  maxMembers: number;
  currentMembers: number; 
  participationCode?: string;
  isPublic: boolean;
  createdAt: string;
}

export type GetGroupMembersResponse = IGroupMembership[];

export interface AddGroupMemberRequest {
  userId: number;
  role?: GroupRole;
  participationCode?: string;
}

export interface AddGroupMemberResponse {
  groupId: number;
  userId: number;
  role: GroupRole;
  joinedAt: string;
}

export type RemoveGroupMemberResponse = void; 