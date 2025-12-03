package com.nimda.con.judge.controller;

import com.nimda.con.judge.dto.ProblemCreateDTO;
import com.nimda.con.judge.entity.Problem;
import com.nimda.con.judge.entity.Submission;
import com.nimda.con.judge.entity.TestCase;
import com.nimda.con.judge.repository.TestCaseRepository;
import com.nimda.con.judge.service.JudgeService;
import com.nimda.con.judge.service.ProblemService;
import com.nimda.con.common.util.JwtUtil;
import com.nimda.con.user.entity.User;
import com.nimda.con.user.repository.UserRepository;
import jakarta.validation.Valid;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.HashMap;
import java.util.List;
import java.util.Map;
import java.util.stream.Collectors;

@RestController
@RequestMapping("/api/problems")
@CrossOrigin(origins = "*")
public class ProblemController {

    private static final Logger logger = LoggerFactory.getLogger(ProblemController.class);

    @Autowired
    private ProblemService problemService;
    @Autowired
    private TestCaseRepository testCaseRepository;
    @Autowired
    private JudgeService judgeService;
    @Autowired
    private UserRepository userRepository;
    @Autowired
    private JwtUtil jwtUtil;

    /**
     * 문제 생성
     */
    @PostMapping
    public ResponseEntity<?> createProblem(@Valid @RequestBody ProblemCreateDTO problemCreateDTO) {
        try {

            Problem problem = problemService.createProblem(problemCreateDTO); // 문제 생성

            Map<String, Object> response = new HashMap<>();
            response.put("success", true);
            response.put("message", "문제가 성공적으로 생성되었습니다");
            response.put("problem", problem);

            return ResponseEntity.status(HttpStatus.CREATED).body(response);
        } catch (Exception e) {
            Map<String, Object> error = new HashMap<>();
            error.put("success", false);
            error.put("message", "문제 생성 중 오류가 발생했습니다: " + e.getMessage());
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body(error);
        }
    }

    /**
     * 모든 문제 조회
     */
    @GetMapping
    public ResponseEntity<?> getAllProblems() {
        System.out.println("=== getAllProblems() 메서드 호출됨 ===");
        try {
            System.out.println("=== ProblemService.getAllProblems() 호출 중 ===");
            List<Problem> problems = problemService.getAllProblems();
            System.out.println("=== 문제 수: " + problems.size() + " ===");

            Map<String, Object> response = new HashMap<>();
            response.put("success", true);
            response.put("problems", problems);

            System.out.println("=== 응답 생성 완료 ===");
            return ResponseEntity.ok(response);
        } catch (Exception e) {
            System.out.println("=== 오류 발생: " + e.getMessage() + " ===");
            e.printStackTrace();
            Map<String, Object> error = new HashMap<>();
            error.put("success", false);
            error.put("message", "문제 목록 조회 중 오류가 발생했습니다: " + e.getMessage());
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body(error);
        }
    }

    /**
     * ID로 문제 조회 (공개된 테스트 케이스만 포함한다.)
     */
    @GetMapping("/{id}")
    public ResponseEntity<?> getProblemById(@PathVariable Long id) {
        try {
            Problem problem = problemService.getProblemById(id);
            // 공개된 테스트케이스만 조회 (프론트엔드용)
            List<TestCase> publicTestCases = testCaseRepository.findByProblemIdAndIsPublicTrue(id);

            // 테스트케이스를 Map으로 변환 (isPublic 필드는 제외)
            List<Map<String, Object>> testCaseList = publicTestCases.stream()
                    .map(tc -> {
                        Map<String, Object> tcMap = new HashMap<>();
                        tcMap.put("id", tc.getId());
                        tcMap.put("input", tc.getInput());
                        tcMap.put("output", tc.getOutput());
                        return tcMap;
                    })
                    .collect(Collectors.toList());

            Map<String, Object> response = new HashMap<>();
            response.put("success", true);
            response.put("problem", problem);
            response.put("testCases", testCaseList); // 공개된 테스트케이스만 포함

            return ResponseEntity.ok(response);
        } catch (RuntimeException e) {
            Map<String, Object> error = new HashMap<>();
            error.put("success", false);
            error.put("message", e.getMessage());
            return ResponseEntity.status(HttpStatus.NOT_FOUND).body(error);
        } catch (Exception e) {
            Map<String, Object> error = new HashMap<>();
            error.put("success", false);
            error.put("message", "문제 조회 중 오류가 발생했습니다: " + e.getMessage());
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body(error);
        }
    }

    /**
     * 문제 삭제
     */
    @DeleteMapping("/{id}")
    public ResponseEntity<?> deleteProblem(@PathVariable Long id) {
        try {
            problemService.deleteProblem(id);

            Map<String, Object> response = new HashMap<>();
            response.put("success", true);
            response.put("message", "문제가 성공적으로 삭제되었습니다");

            return ResponseEntity.ok(response);
        } catch (RuntimeException e) {
            Map<String, Object> error = new HashMap<>();
            error.put("success", false);
            error.put("message", e.getMessage());
            return ResponseEntity.status(HttpStatus.NOT_FOUND).body(error);
        } catch (Exception e) {
            Map<String, Object> error = new HashMap<>();
            error.put("success", false);
            error.put("message", "문제 삭제 중 오류가 발생했습니다: " + e.getMessage());
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body(error);
        }
    }

    /**
     * 특정 그룹의 문제들 조회
     */
    @GetMapping("/group/{groupId}")
    public ResponseEntity<?> getProblemsByGroup(@PathVariable Long groupId) {
        try {
            List<Problem> problems = problemService.getProblemsByGroupId(groupId);

            Map<String, Object> response = new HashMap<>();
            response.put("success", true);
            response.put("problems", problems);
            return ResponseEntity.ok(response);

        } catch (Exception e) {
            Map<String, Object> error = new HashMap<>();
            error.put("success", false);
            error.put("message", "그룹별 문제 조회 중 오류가 발생했습니다: " + e.getMessage());
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body(error);
        }
    }

    /**
     * 전역 문제들 조회 (그룹에 속하지 않은 문제)
     */
    @GetMapping("/global")
    public ResponseEntity<?> getGlobalProblems() {
        try {
            List<Problem> problems = problemService.getGlobalProblems();

            Map<String, Object> response = new HashMap<>();
            response.put("success", true);
            response.put("problems", problems);

            return ResponseEntity.ok(response);
        } catch (Exception e) {
            Map<String, Object> error = new HashMap<>();
            error.put("success", false);
            error.put("message", "전역 문제 조회 중 오류가 발생했습니다: " + e.getMessage());
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body(error);
        }
    }

    /**
     * 특정 문제에 대한 사용자의 최신 제출 결과 조회
     * GET /api/problems/{id}/result
     */
    @GetMapping("/{id}/result")
    public ResponseEntity<?> getProblemResult(
            @PathVariable Long id,
            @RequestHeader(value = "Authorization", required = false) String authHeader) {
        try {
            // JWT 토큰에서 사용자 정보 추출
            Long userId = null;
            if (authHeader != null && authHeader.startsWith("Bearer ")) {
                String token = authHeader.substring(7);
                try {
                    userId = jwtUtil.extractUserId(token);
                } catch (Exception e) {
                    logger.warn("토큰에서 사용자 ID 추출 실패: {}", e.getMessage());
                }
            }

            if (userId == null) {
                Map<String, Object> error = new HashMap<>();
                error.put("success", false);
                error.put("message", "인증이 필요합니다.");
                return ResponseEntity.status(HttpStatus.UNAUTHORIZED).body(error);
            }

            // 사용자 조회
            User user = userRepository.findById(userId)
                    .orElseThrow(() -> new RuntimeException("사용자를 찾을 수 없습니다."));

            // 사용자의 해당 문제에 대한 최신 제출 조회
            List<Submission> submissions = judgeService.getSubmissionsByUserAndProblem(userId, id);

            if (submissions.isEmpty()) {
                Map<String, Object> response = new HashMap<>();
                response.put("success", true);
                response.put("result", null);
                response.put("message", "제출 기록이 없습니다.");
                return ResponseEntity.ok(response);
            }

            // 최신 제출 (첫 번째 항목)
            Submission latestSubmission = submissions.get(0);

            // 응답 데이터 구성
            Map<String, Object> resultData = new HashMap<>();
            resultData.put("problemId", id);
            resultData.put("submissionId", latestSubmission.getId());
            resultData.put("userName", user.getUserName());
            resultData.put("status", latestSubmission.getStatus().name());
            resultData.put("language", latestSubmission.getLanguage().name());
            resultData.put("submittedCode", latestSubmission.getCode());
            resultData.put("submittedAt", latestSubmission.getSubmittedAt());

            // JudgeResult 정보 추가
            if (latestSubmission.getJudgeResult() != null) {
                resultData.put("executionTime", latestSubmission.getJudgeResult().getExecutionTime() != null
                        ? latestSubmission.getJudgeResult().getExecutionTime() + "ms"
                        : "-");
                resultData.put("memoryUsage", latestSubmission.getJudgeResult().getMemoryUsage() != null
                        ? latestSubmission.getJudgeResult().getMemoryUsage() + "KB"
                        : "-");
                resultData.put("score", latestSubmission.getJudgeResult().getScore());
                resultData.put("message", latestSubmission.getJudgeResult().getMessage());
            } else {
                resultData.put("executionTime", "-");
                resultData.put("memoryUsage", "-");
                resultData.put("score", 0);
                resultData.put("message", "채점 중입니다.");
            }

            // 테스트케이스 결과는 간단하게 처리 (실제로는 JudgeResult에 저장된 정보를 활용)
            resultData.put("testCases", List.of());

            Map<String, Object> response = new HashMap<>();
            response.put("success", true);
            response.put("result", resultData);

            return ResponseEntity.ok(response);

        } catch (RuntimeException e) {
            Map<String, Object> error = new HashMap<>();
            error.put("success", false);
            error.put("message", e.getMessage());
            return ResponseEntity.status(HttpStatus.NOT_FOUND).body(error);
        } catch (Exception e) {
            logger.error("문제 결과 조회 중 오류 발생", e);
            Map<String, Object> error = new HashMap<>();
            error.put("success", false);
            error.put("message", "문제 결과 조회 중 오류가 발생했습니다: " + e.getMessage());
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body(error);
        }
    }
}
