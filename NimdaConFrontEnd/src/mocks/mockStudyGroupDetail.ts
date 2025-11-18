import type { IStudyGroup } from "@/types/studyGroup";
import type { IProblem } from "@/types/problem";

export interface IProblemWithProgress extends IProblem {
  completionRate?: number; // 완료율 (0-100)
  completionCount?: number; // 완료한 멤버 수
  totalMembers?: number; // 전체 멤버 수
}

export const mockStudyGroupDetail: IStudyGroup = {
  group_id: 1,
  group_name: "알고리즘 마스터 스터디",
  description: "코딩 테스트 합격을 목표로 하는 스터디입니다.",
  goal: "알고리즘 마스터",
  max_members: 10,
  participation_code: "ABC123",
  is_public: true,
  created_by: 101,
  created_at: "2025-10-15T00:00:00Z",
  updated_at: "2025-11-10T00:00:00Z",
  current_members: [
    { 
      membership_id: 1, 
      user_id: 101, 
      group_id: 1, 
      role: 'LEADER', 
      joined_at: '2025-10-15T00:00:00Z', 
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
      joined_at: '2025-10-16T00:00:00Z', 
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
    },
    { 
      membership_id: 3, 
      user_id: 103, 
      group_id: 1, 
      role: 'MEMBER', 
      joined_at: '2025-10-17T00:00:00Z', 
      left_at: null,
      user: { 
        user_id: 103, 
        email: 'park@example.com', 
        user_name: '박알고',
        university_name: null,
        department: null,
        grade: null,
        created_at: '',
        updated_at: ''
      }
    },
    { 
      membership_id: 4, 
      user_id: 104, 
      group_id: 1, 
      role: 'MEMBER', 
      joined_at: '2025-10-18T00:00:00Z', 
      left_at: null,
      user: { 
        user_id: 104, 
        email: 'choi@example.com', 
        user_name: '최백준',
        university_name: null,
        department: null,
        grade: null,
        created_at: '',
        updated_at: ''
      }
    },
    { 
      membership_id: 5, 
      user_id: 105, 
      group_id: 1, 
      role: 'MEMBER', 
      joined_at: '2025-10-19T00:00:00Z', 
      left_at: null,
      user: { 
        user_id: 105, 
        email: 'jung@example.com', 
        user_name: '정프로',
        university_name: null,
        department: null,
        grade: null,
        created_at: '',
        updated_at: ''
      }
    },
  ],
  creator: {
    user_id: 101,
    email: 'kim@example.com',
    user_name: '김그룹',
    university_name: null,
    department: null,
    grade: null,
    created_at: '',
    updated_at: ''
  }
};