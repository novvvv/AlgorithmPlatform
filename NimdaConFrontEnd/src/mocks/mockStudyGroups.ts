import type { IStudyGroup } from "@/types/group";

const mockStudyGroups: IStudyGroup[] = [
  // --- Group 1 (ID: 1) - 101 포함 ---
  {
    groupId: 1,
    groupName: "알고리즘 기초반 (Group 1)",
    description: "문제 1, 2, 3번을 다루는 기초 스터디입니다. 기초부터 탄탄하게!",
    goal: "기초 문제 마스터",
    maxMembers: 10,
    participationCode: null,
    isPublic: true,
    creatorUserId: 101,
    createdAt: "2025-10-01T00:00:00Z",
    updatedAt: "2025-11-01T00:00:00Z",
    currentMembers: [
      { membershipId: 1, groupId: 1, userId: 101, role: 'LEADER', joinedAt: '2025-10-01T00:00:00Z', leftAt: null, userName: '김그룹', active: true },
      { membershipId: 2, groupId: 1, userId: 102, role: 'MEMBER', joinedAt: '2025-10-02T00:00:00Z', leftAt: null, userName: '이코딩', active: true },
      { membershipId: 3, groupId: 1, userId: 103, role: 'MEMBER', joinedAt: '2025-10-03T00:00:00Z', leftAt: null, userName: '박알고', active: true },
      { membershipId: 4, groupId: 1, userId: 104, role: 'MEMBER', joinedAt: '2025-10-04T00:00:00Z', leftAt: null, userName: '최백준', active: true }
    ]
  },
  
  // --- Group 2 (ID: 2) - 101 포함 ---
  {
    groupId: 2,
    groupName: "자료구조 심화반 (Group 2)",
    description: "문제 4, 5번 트리와 그래프를 다룹니다. 심화 학습을 위한 공간.",
    goal: "자료구조 완전 정복",
    maxMembers: 5,
    participationCode: "TREE123",
    isPublic: false,
    creatorUserId: 106,
    createdAt: "2025-09-20T00:00:00Z",
    updatedAt: "2025-11-01T00:00:00Z",
    currentMembers: [
      { membershipId: 21, groupId: 2, userId: 106, role: 'LEADER', joinedAt: '2025-09-20T00:00:00Z', leftAt: null, userName: '정트리', active: true },
      { membershipId: 22, groupId: 2, userId: 101, role: 'MEMBER', joinedAt: '2025-09-21T00:00:00Z', leftAt: null, userName: '김그룹', active: true },
      { membershipId: 23, groupId: 2, userId: 105, role: 'MEMBER', joinedAt: '2025-09-22T00:00:00Z', leftAt: null, userName: '무명멤버', active: true }
    ]
  },
  
  // --- Group 3 (ID: 3) - 101 포함 ---
  {
    groupId: 3,
    groupName: "나혼자 푼다 (Group 3)",
    description: "문제 6번 그리디 알고리즘. 혼자서 공부하는 그룹입니다.",
    goal: "혼자서도 잘해요",
    maxMembers: 1,
    participationCode: "SOLO1",
    isPublic: false,
    creatorUserId: 101,
    createdAt: "2025-10-15T00:00:00Z",
    updatedAt: "2025-11-10T00:00:00Z",
    currentMembers: [
      { membershipId: 31, groupId: 3, userId: 101, role: 'LEADER', joinedAt: '2025-10-15T00:00:00Z', leftAt: null, userName: '김그룹', active: true }
    ]
  },

  // 💡 --- Group 4 (ID: 4) - 101 미포함 (공개 그룹) ---
  // 시나리오: 공개 그룹이지만 아직 가입하지 않음 -> 리스트에서 '가입하기' 버튼 확인용
  {
    groupId: 4,
    groupName: "CS 전공지식 스터디 (Group 4)",
    description: "운영체제, 네트워크 등 전공 지식을 공부합니다. (101번 유저 없음)",
    goal: "면접 대비",
    maxMembers: 20,
    participationCode: null,
    isPublic: true,
    creatorUserId: 201, // 101이 아닌 다른 유저가 생성
    createdAt: "2025-11-01T00:00:00Z",
    updatedAt: "2025-11-01T00:00:00Z",
    currentMembers: [
      { membershipId: 41, groupId: 4, userId: 201, role: 'LEADER', joinedAt: '2025-11-01T00:00:00Z', leftAt: null, userName: '강운영', active: true },
      { membershipId: 42, groupId: 4, userId: 202, role: 'MEMBER', joinedAt: '2025-11-02T00:00:00Z', leftAt: null, userName: '송네트', active: true }
    ]
  },

  // 💡 --- Group 5 (ID: 5) - 101 미포함 (비공개 그룹) ---
  // 시나리오: 비공개 그룹이고 가입하지 않음 -> 리스트에서 '잠금' 표시 및 모달 확인용
  {
    groupId: 5,
    groupName: "스프링 부트 고수반 (Group 5)",
    description: "백엔드 개발자를 위한 심화 스터디. 초대 코드 필수.",
    goal: "실무 프로젝트 완성",
    maxMembers: 5,
    participationCode: "SPRING2025",
    isPublic: false,
    creatorUserId: 203,
    createdAt: "2025-11-05T00:00:00Z",
    updatedAt: "2025-11-05T00:00:00Z",
    currentMembers: [
      { membershipId: 51, groupId: 5, userId: 203, role: 'LEADER', joinedAt: '2025-11-05T00:00:00Z', leftAt: null, userName: '백엔드왕', active: true }
    ]
  }
];
export default mockStudyGroups;