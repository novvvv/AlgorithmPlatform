package com.nimda.con.judge.service;

import com.nimda.con.judge.dto.SubmissionResponseDto;
import com.nimda.con.judge.entity.Submission;
import com.nimda.con.judge.repository.SubmissionRepository;
import com.nimda.con.user.entity.User;
import com.nimda.con.user.repository.UserRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

@Service
@RequiredArgsConstructor
@Transactional(readOnly = true)
public class SubmissionService {

    private final SubmissionRepository submissionRepository;
    private final UserRepository userRepository;

    /**
     * 그룹별 최근 제출 기록 조회
     */
    public Page<SubmissionResponseDto> getRecentSubmissionsByGroup(Long groupId, Pageable pageable) {
        Page<Submission> submissions = submissionRepository.findByGroupIdOrderBySubmittedAtDesc(groupId, pageable);
        return submissions.map(SubmissionResponseDto::from);
    }

    /**
     * 유저별 최근 제출 기록 조회
     */
    public Page<SubmissionResponseDto> getRecentSubmissionsByUser(Long userId, Pageable pageable) {
        User user = userRepository.findById(userId)
                .orElseThrow(() -> new IllegalArgumentException("User not found with id: " + userId));

        Page<Submission> submissions = submissionRepository.findByUserOrderBySubmittedAtDesc(user, pageable);
        return submissions.map(SubmissionResponseDto::from);
    }
}
