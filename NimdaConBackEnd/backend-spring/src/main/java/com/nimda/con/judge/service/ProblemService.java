package com.nimda.con.judge.service;

import com.nimda.con.group.entity.StudyGroup;
import com.nimda.con.group.repository.StudyGroupRepository;
import com.nimda.con.judge.dto.ProblemCreateDTO;
import com.nimda.con.judge.entity.Problem;
import com.nimda.con.judge.entity.TestCase;
import com.nimda.con.judge.repository.ProblemRepository;
import com.nimda.con.judge.repository.TestCaseRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;

@Service
public class ProblemService {

    @Autowired
    private ProblemRepository problemRepository;

    @Autowired
    private TestCaseRepository testCaseRepository;

    @Autowired
    private StudyGroupRepository studyGroupRepository;

    /**
     * 문제 생성
     */
    @Transactional
    public Problem createProblem(ProblemCreateDTO problemCreateDTO) {

        // 1. Problem 엔티티 생성
        Problem problem = new Problem();
        problem.setTitle(problemCreateDTO.getTitle());
        problem.setDescription(problemCreateDTO.getDescription());
        problem.setTimeLimit(problemCreateDTO.getTimeLimit());
        problem.setMemoryLimit(problemCreateDTO.getMemoryLimit());
        problem.setDifficulty(problemCreateDTO.getDifficulty());
        problem.setLanguage(problemCreateDTO.getLanguage());

        // 2. 스터디 그룹 연결 (groupId가 제공된 경우)
        if (problemCreateDTO.getGroupId() != null) {
            StudyGroup group = studyGroupRepository.findById(problemCreateDTO.getGroupId())
                    .orElseThrow(() -> new RuntimeException("스터디 그룹을 찾을 수 없습니다: " + problemCreateDTO.getGroupId()));
            problem.setGroup(group);
        }

        // 3. Problem 저장
        problem = problemRepository.save(problem);

        // 4. TestCase 생성 및 저장
        if (problemCreateDTO.getTestCases() != null && !problemCreateDTO.getTestCases().isEmpty()) {
            for (ProblemCreateDTO.TestCaseDTO testCaseDTO : problemCreateDTO.getTestCases()) {
                TestCase testCase = new TestCase();
                testCase.setProblem(problem);
                testCase.setInput(testCaseDTO.getInput());
                testCase.setOutput(testCaseDTO.getOutput());
                testCaseRepository.save(testCase);
            }
        }

        return problem;
    }

    /**
     * 모든 문제 조회
     */
    @Transactional(readOnly = true)
    public List<Problem> getAllProblems() {
        System.out.println("=== ProblemService.getAllProblems() 호출됨 ===");
        try {
            System.out.println("=== problemRepository.findAll() 호출 중 ===");
            List<Problem> problems = problemRepository.findAll();
            System.out.println("=== 문제 수: " + problems.size() + " ===");
            return problems;
        } catch (Exception e) {
            System.out.println("=== ProblemService에서 오류 발생: " + e.getMessage() + " ===");
            e.printStackTrace();
            throw e;
        }
    }

    /**
     * ID로 문제 조회
     */
    @Transactional(readOnly = true)
    public Problem getProblemById(Long id) {
        return problemRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("문제를 찾을 수 없습니다: " + id));
    }

    /**
     * 문제 삭제
     */
    @Transactional
    public void deleteProblem(Long id) {
        if (!problemRepository.existsById(id)) {
            throw new RuntimeException("문제를 찾을 수 없습니다: " + id);
        }
        problemRepository.deleteById(id);
    }

    /**
     * 특정 그룹의 문제들 조회
     */
    @Transactional(readOnly = true)
    public List<Problem> getProblemsByGroupId(Long groupId) {
        return problemRepository.findByGroupId(groupId);
    }

    /**
     * 그룹에 속하지 않은 전역 문제들 조회
     */
    @Transactional(readOnly = true)
    public List<Problem> getGlobalProblems() {
        return problemRepository.findByGroupIsNull();
    }

}
