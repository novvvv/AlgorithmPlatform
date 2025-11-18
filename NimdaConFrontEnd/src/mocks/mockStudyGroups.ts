import type { IStudyGroup } from "@/types/studyGroup";

const mockStudyGroups: IStudyGroup[] = [
  {
    group_id: 1,
    group_name: "스터디그룹 이름 A",
    description: "초급-중급 알고리즘 스터디입니다.",
    goal: "알고리즘 마스터",
    max_members: 20,
    participation_code: null,
    is_public: true,
    created_by: 101,
    created_at: "2025-10-01T00:00:00Z",
    updated_at: "2025-11-01T00:00:00Z",
    current_members: [
      {
        membership_id: 1,
        user_id: 101,
        group_id: 1,
        role: 'LEADER',
        joined_at: '2025-10-01T00:00:00Z',
        left_at: null,
        user: {
          user_id: 101,
          email: 'kim@example.com',
          user_name: '김그룹',
          university_name: null,
          department: null,
          grade: null,
          created_at: '',
          updated_at: ''
        }
      },
      {
        membership_id: 2,
        user_id: 102,
        group_id: 1,
        role: 'MEMBER',
        joined_at: '2025-10-05T00:00:00Z',
        left_at: null,
        user: {
          user_id: 102,
          email: 'lee@example.com',
          user_name: '이코딩',
          university_name: null,
          department: null,
          grade: null,
          created_at: '',
          updated_at: ''
        }
      }
    ], creator: {
      user_id: 101,
      email: 'kim@example.com',
      user_name: '김그룹',
      university_name: null,
      department: null,
      grade: null,
      created_at: '',
      updated_at: ''
    }
  },
  {
    group_id: 2,
    group_name: "스터디그룹 이름 B",
    description: "중급자 대상 실전 문제 풀이 스터디",
    goal: "주간 5문제",
    max_members: 15,
    participation_code: "SECRET123",
    is_public: false,
    created_by: 102,
    created_at: "2025-09-20T00:00:00Z",
    updated_at: "2025-11-01T00:00:00Z",
    current_members: [
      {
        membership_id: 21,
        user_id: 201,
        group_id: 2,
        role: 'LEADER',
        joined_at: '2025-09-20T00:00:00Z',
        left_at: null,
        user: {
          user_id: 201,
          email: 'park@example.com',
          user_name: '박리더',
          university_name: null,
          department: null,
          grade: null,
          created_at: '',
          updated_at: ''
        }
      },
      {
        membership_id: 22,
        user_id: 202,
        group_id: 2,
        role: 'MEMBER',
        joined_at: '2025-09-21T00:00:00Z',
        left_at: null,
        user: {
          user_id: 202,
          email: 'choi@example.com',
          user_name: '최멤버',
          university_name: null,
          department: null,
          grade: null,
          created_at: '',
          updated_at: ''
        }
      }
    ], creator: {
          user_id: 201,
          email: 'park@example.com',
          user_name: '박리더',
          university_name: null,
          department: null,
          grade: null,
          created_at: '',
          updated_at: ''
      }
  },
];
export default mockStudyGroups;