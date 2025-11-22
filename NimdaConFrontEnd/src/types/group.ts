export type GroupRole = 'LEADER' | 'MEMBER';

export interface IStudyGroup {
  groupId: number;
  groupName: string;
  maxMembers: number;
  isPublic: boolean;
  participationCode: string | null;
  creatorUserId: number;
  createdAt: string;
  updatedAt: string;
}

export interface IGroupMembership {
  membershipId: number;
  groupId: number;
  userId: number;
  nickname: string;
  role: GroupRole;
  active: boolean;
  joinedAt: string;
  leftAt: string | null;
}

export interface AddGroupMemberRequest {
  userId: number;
  role: GroupRole;
  participationCode: string;
}

export type GetAllGroupsResponse = IStudyGroup[];

export type AddGroupMemberResponse = IGroupMembership;

export type GetGroupMembersResponse = IGroupMembership[];

export interface GetGroupCreateRequest {
  groupName: string;
  description?: string;
  goal?: string;
  maxMembers?: number;
  isPublic?: boolean;
}
