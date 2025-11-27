import type { IProblem } from "@/types/problem"; 

export type IProblemWithProgress = IProblem & {
  completionCount?: number;
  totalMembers?: number;
  solvedBy?: { userId: number; score: number }[]; 
  averageScore?: number; 
};

export const mockProblems: IProblemWithProgress[] = [
  // --- Group 1 (ID: 1) ---
  {
    id: 1,
    title: "두 수의 합 (Two Sum)",
    description: "배열에서 두 수를 더해 target을 만드는 인덱스를 반환하세요.",
    timeLimit: 1000,
    memoryLimit: 256,
    groupId: 1, 
    createdAt: "2025-01-10",
    updatedAt: "2025-01-15",
    language: "PYTHON", 
    difficulty: "EASY",
    completionCount: 3,
    totalMembers: 4,
    solvedBy: [
        { userId: 101, score: 100 }, 
        { userId: 103, score: 90 }, 
        { userId: 104, score: 80 }
    ], 
    averageScore: 90,
  },
  {
    id: 2,
    title: "가장 긴 팰린드롬 부분 문자열",
    description: "주어진 문자열에서 가장 긴 팰린드롬(회문) 부분 문자열을 찾으세요.",
    timeLimit: 2000,
    memoryLimit: 512,
    groupId: 1,
    createdAt: "2025-01-12",
    updatedAt: "2025-01-20",
    language: "JAVA",
    difficulty: "MEDIUM",
    completionCount: 2,
    totalMembers: 4,
    solvedBy: [
        { userId: 102, score: 85 }, 
        { userId: 103, score: 95 }
    ],
    averageScore: 90,
  },
  {
    id: 3,
    title: "괄호 유효성 검사",
    description: "문자열 S가 유효한 괄호 순서인지 확인하세요.",
    timeLimit: 1500,
    memoryLimit: 256,
    groupId: 1,
    createdAt: "2025-01-25",
    updatedAt: "2025-01-25",
    language: "CPP",
    difficulty: "EASY",
    completionCount: 0,
    totalMembers: 4,
    solvedBy: [], 
    averageScore: 0,
  },
  
  // --- Group 2 (ID: 2) ---
  {
    id: 4,
    title: "트리 순회",
    description: "전위, 중위, 후위 순회 결과를 출력하세요.",
    timeLimit: 1000,
    memoryLimit: 512,
    groupId: 2,
    createdAt: "2025-02-01",
    updatedAt: "2025-02-05",
    language: "JAVA",
    difficulty: "MEDIUM",
    completionCount: 2,
    totalMembers: 3,
    solvedBy: [
        { userId: 101, score: 100 }, 
        { userId: 106, score: 100 }
    ],
    averageScore: 100,
  },
  {
    id: 5,
    title: "최단 경로 찾기",
    description: "다익스트라 알고리즘을 사용하여 최단 경로를 찾으세요.",
    timeLimit: 3000,
    memoryLimit: 1024,
    groupId: 2,
    createdAt: "2025-02-10",
    updatedAt: "2025-02-15",
    language: "CPP",
    difficulty: "HARD",
    completionCount: 0,
    totalMembers: 3,
    solvedBy: [],
    averageScore: 0,
  },

  // --- Group 3 (ID: 3) ---
  {
    id: 6,
    title: "그리디 알고리즘 기초",
    description: "거스름돈 문제 풀이",
    timeLimit: 1000,
    memoryLimit: 256,
    groupId: 3, 
    createdAt: "2025-03-01",
    updatedAt: "2025-03-01",
    language: "PYTHON",
    difficulty: "EASY",
    completionCount: 1,
    totalMembers: 1,
    solvedBy: [
        { userId: 101, score: 100 }
    ],
    averageScore: 100,
  },
  {
    id: 7,
    title: "K번째 수 찾기",
    description: "정렬 후 K번째 원소를 찾는 문제.",
    timeLimit: 500,
    memoryLimit: 128,
    groupId: null, 
    createdAt: "2025-03-15",
    updatedAt: "2025-03-15",
    language: "JAVA",
    difficulty: "MEDIUM",
    completionCount: 0,
    totalMembers: 0,
    solvedBy: [
        { userId: 102, score: 40 }
    ],
    averageScore: 40,
  },

  // 💡 --- Group 4 (ID: 4) 문제 --- 
  // 101번 유저는 이 그룹에 없으므로 solvedBy에 포함되지 않음
  {
    id: 8,
    title: "LRU 캐시 구현",
    description: "LRU (Least Recently Used) 캐시 알고리즘을 구현하세요.",
    timeLimit: 2000,
    memoryLimit: 512,
    groupId: 4, 
    createdAt: "2025-11-01",
    updatedAt: "2025-11-01",
    language: "JAVA" as const, 
    difficulty: "HARD" as const,
    completionCount: 1,
    totalMembers: 2, // 201, 202
    solvedBy: [
        { userId: 201, score: 100 } // 강운영(201)만 해결
    ], 
    averageScore: 100,
  },

  // 💡 --- Group 5 (ID: 5) 문제 ---
  // 101번 유저는 이 그룹에 없음
  {
    id: 9,
    title: "REST API 설계",
    description: "주어진 요구사항에 맞는 REST API를 설계하고 구현하세요.",
    timeLimit: 3000,
    memoryLimit: 1024,
    groupId: 5, 
    createdAt: "2025-11-05",
    updatedAt: "2025-11-05",
    language: "JAVA" as const, 
    difficulty: "MEDIUM" as const,
    completionCount: 1,
    totalMembers: 1, // 203
    solvedBy: [
        { userId: 203, score: 100 } // 백엔드왕(203)만 해결
    ], 
    averageScore: 100,
  },
];