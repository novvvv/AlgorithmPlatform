import type { IStudyGroup } from "@/types/group";

const mockStudyGroups: IStudyGroup[] = [
  {
    groupId: 1,
    groupName: "스터디그룹 이름 A",
    description: "초급-중급 알고리즘 스터디입니다.",
    goal: "알고리즘 마스터",
    maxMembers: 20,
    participationCode: null,
    isPublic: true,
    creatorUserId: 101,
    createdAt: "2025-10-01T00:00:00Z",
    updatedAt: "2025-11-01T00:00:00Z",
    currentMembers: [
      {
        membershipId: 1,
        groupId: 1,
        userId: 101,
        role: 'LEADER',
        joinedAt: '2025-10-01T00:00:00Z',
        leftAt: null,
        userName: '김그룹', 
        active: true
      },
      {
        membershipId: 2,
        groupId: 1,
        userId: 102,
        role: 'MEMBER',
        joinedAt: '2025-10-05T00:00:00Z',
        leftAt: null,
        userName: '이코딩', 
        active: true
      }
    ]
  },
  {
    groupId: 2,
    groupName: "스터디그룹 이름 B",
    description: "중급자 대상 실전 문제 풀이 스터디",
    goal: "주간 5문제",
    maxMembers: 15,
    participationCode: null,
    isPublic: false,
    creatorUserId: 102,
    createdAt: "2025-09-20T00:00:00Z",
    updatedAt: "2025-11-01T00:00:00Z",
    currentMembers: [
      {
        membershipId: 21,
        groupId: 2,
        userId: 201,
        role: 'LEADER',
        joinedAt: '2025-09-20T00:00:00Z',
        leftAt: null,
        userName: '박리더', 
        active: true
      },
      {
        membershipId: 22,
        groupId: 2,
        userId: 202,
        role: 'MEMBER',
        joinedAt: '2025-09-21T00:00:00Z',
        leftAt: null,
        userName: '최멤버', 
        active: true
      }
    ]
  },
  {
    groupId: 3,
    groupName: "알고리즘 마스터 스터디",
    description: "코딩 테스트 합격을 목표로 하는 스터디입니다.",
    goal: "알고리즘 마스터",
    maxMembers: 10,
    participationCode: "ABC123",
    isPublic: false,
    creatorUserId: 101,
    createdAt: "2025-10-15T00:00:00Z",
    updatedAt: "2025-11-10T00:00:00Z",
    currentMembers: [
      {
        membershipId: 1,
        groupId: 3,
        userId: 101,
        role: 'LEADER',
        joinedAt: '2025-10-15T00:00:00Z',
        leftAt: null,
        userName: '김그룹', 
        active: true
      },
      {
        membershipId: 2,
        groupId: 3,
        userId: 102,
        role: 'MEMBER',
        joinedAt: '2025-10-16T00:00:00Z',
        leftAt: null,
        userName: '이코딩', 
        active: true
      },
      {
        membershipId: 3,
        groupId: 3,
        userId: 103,
        role: 'MEMBER',
        joinedAt: '2025-10-17T00:00:00Z',
        leftAt: null,
        userName: '박알고', 
        active: true
      },
      {
        membershipId: 4,
        groupId: 3,
        userId: 104,
        role: 'MEMBER',
        joinedAt: '2025-10-18T00:00:00Z',
        leftAt: null,
        userName: '최백준', 
        active: true
      },
      {
        membershipId: 5,
        groupId: 3,
        userId: 105,
        role: 'MEMBER',
        joinedAt: '2025-10-19T00:00:00Z',
        leftAt: null,
        userName: '정프로', 
        active: true
      }
    ]
  }
];
export default mockStudyGroups;
