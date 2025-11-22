import type {
  AddGroupMemberRequest,
  GetAllGroupsResponse,
  AddGroupMemberResponse,
  GetGroupMembersResponse,
} from "@/types/group";
import { apiClient, getErrorMessage } from "./utils";

/**
 * 모든 스터디그룹 조회 API
 * GET /api/groups
 */
export const getAllGroupsAPI = async (): Promise<GetAllGroupsResponse> => {
  try {
    const response = await apiClient.get<GetAllGroupsResponse>("/groups");
    return response.data;
  } catch (error: unknown) {
    console.error("그룹 목록 조회 오류:", error);
    throw new Error(getErrorMessage(error));
  }
};

/**
 * 스터디그룹 멤버 초대 API
 * POST /api/groups/{groupId}/members
 */
export const addGroupMemberAPI = async (
  groupId: number,
  memberData: AddGroupMemberRequest
): Promise<AddGroupMemberResponse> => {
  try {
    const response = await apiClient.post<AddGroupMemberResponse>(
      `/groups/${groupId}/members`,
      memberData
    );
    return response.data;
  } catch (error: unknown) {
    console.error("멤버 초대 API 오류:", error);
    throw new Error(getErrorMessage(error));
  }
};

/**
 * 그룹 멤버 조회 API
 * GET /api/groups/{groupId}/members
 */
export const getGroupMembersAPI = async (
  groupId: number
): Promise<GetGroupMembersResponse> => {
  try {
    const response = await apiClient.get<GetGroupMembersResponse>(
      `/groups/${groupId}/members`
    );
    return response.data;
  } catch (error: unknown) {
    console.error("그룹 멤버 조회 오류:", error);
    throw new Error(getErrorMessage(error));
  }
};
