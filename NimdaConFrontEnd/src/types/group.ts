export type GroupRole = 'LEADER' | 'MEMBER';

import type { IUser } from "./user";

export interface IStudyGroup {
  groupId: number;
  groupName: string;
  description?: string | null;
  goal?: string | null;
  maxMembers: number;
  participationCode: string | null;
  isPublic: boolean;
  creatorUserId?: number;
  createdAt: string;
  updatedAt: string;
  currentMembers?: IGroupMembership[];
}

export interface IGroupMembership {
  membershipId: number;
  groupId: number;
  userId: number;
  userName?: string;
  role: GroupRole;
  active: boolean;
  joinedAt: string;
  leftAt: string | null;
  user?: IUser;
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
