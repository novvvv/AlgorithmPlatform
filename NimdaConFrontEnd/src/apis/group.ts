import type {
  AddGroupMemberRequest,
  GetAllGroupsResponse,
  AddGroupMemberResponse,
  GetGroupMembersResponse,
  RemoveGroupMemberResponse,
  GetGroupCreateRequest, 
  GetGroupCreateResponse
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
 * 스터디그룹 가입 API
 * POST /api/groups/{groupId}/members
 */
export async function joinGroupAPI(
  groupId: number,
  data: AddGroupMemberRequest
): Promise<AddGroupMemberResponse> {
  const response = await apiClient.post<AddGroupMemberResponse>(
    `/groups/${groupId}/members`,
    data
  );
  return response.data;
}

/**
 * 스터디그룹 탈퇴 API
 * DELETE /api/groups/{groupId}/members/{memberId}
 */
export async function leaveGroupAPI(
  groupId: number,
  memberId: number
): Promise<RemoveGroupMemberResponse> {
  await apiClient.delete(`/groups/${groupId}/members/${memberId}`);
}

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

/**
 * 스터디그룹 생성 API
 * POST /api/groups
 */
export const createGroupAPI = async (
  data: GetGroupCreateRequest
): Promise<GetGroupCreateResponse> => {
  try {
    const response = await apiClient.post<GetGroupCreateResponse>("/groups", data);
    return response.data;
  } catch (error: unknown) {
    console.error("그룹 생성 API 오류:", error);
    throw new Error(getErrorMessage(error));
  }
};