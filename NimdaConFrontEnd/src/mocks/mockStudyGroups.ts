import type { IStudyGroup } from "@/types/studyGroup";

const mockStudyGroups: IStudyGroup[] = [
  {
    group_id: 1,
    group_name: "스터디그룹 이름 A",
    description: null,
    goal: "알고리즘 마스터",
    max_members: 20,
    participation_code: null,
    is_public: true,
    created_by: 101,
    created_at: "",
    updated_at: "",
    // current_members 목업 데이터 (길이가 멤버 수)
    current_members: [{ membership_id: 1, user_id: 2, group_id: 1, role: 'LEADER', joined_at: '', left_at: null }, { membership_id: 2, user_id: 3, group_id: 1, role: 'MEMBER', joined_at: '', left_at: null }], // 2명
  },
  {
    group_id: 2,
    group_name: "스터디그룹 이름 B",
    description: null,
    goal: null,
    max_members: 15,
    participation_code: "SECRET123",
    is_public: false,
    created_by: 102,
    created_at: "",
    updated_at: "",
    current_members: Array(12).fill(null), // 12명
  },
  {
    group_id: 3,
    group_name: "스터디그룹 이름 C",
    description: null,
    goal: "코딩 테스트 준비",
    max_members: 20,
    participation_code: null,
    is_public: true,
    created_by: 103,
    created_at: "",
    updated_at: "",
    current_members: Array(8).fill(null), // 8명
  },
];
export default mockStudyGroups;