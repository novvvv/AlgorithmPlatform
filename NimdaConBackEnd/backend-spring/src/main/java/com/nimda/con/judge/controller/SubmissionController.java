package com.nimda.con.judge.controller;

import com.nimda.con.judge.dto.SubmissionResponseDto;
import com.nimda.con.judge.service.SubmissionService;
import lombok.RequiredArgsConstructor;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.domain.Sort;
import org.springframework.data.web.PageableDefault;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api")
@RequiredArgsConstructor
public class SubmissionController {

    private final SubmissionService submissionService;

    /**
     * 그룹별 최근 제출 기록 조회
     */
    @GetMapping("/groups/{groupId}/submissions/recent")
    public ResponseEntity<Page<SubmissionResponseDto>> getRecentSubmissionsByGroup(
            @PathVariable Long groupId,
            @PageableDefault(size = 20, sort = "submittedAt", direction = Sort.Direction.DESC) Pageable pageable) {
        return ResponseEntity.ok(submissionService.getRecentSubmissionsByGroup(groupId, pageable));
    }

    /**
     * 유저별 최근 제출 기록 조회
     */
    @GetMapping("/users/{userId}/submissions/recent")
    public ResponseEntity<Page<SubmissionResponseDto>> getRecentSubmissionsByUser(
            @PathVariable Long userId,
            @PageableDefault(size = 20, sort = "submittedAt", direction = Sort.Direction.DESC) Pageable pageable) {
        return ResponseEntity.ok(submissionService.getRecentSubmissionsByUser(userId, pageable));
    }
}
