export type GroupRole = 'LEADER' | 'MEMBER';

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
  active: boolean;
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
  creatorUserId?: number;
}
export type GetGroupMembersResponse = IGroupMembership[];

export interface AddGroupMemberRequest {
  userId: number;
  role: GroupRole;
  participationCode: string;
}
export type AddGroupMemberResponse = IGroupMembership;

export type RemoveGroupMemberResponse = void; 