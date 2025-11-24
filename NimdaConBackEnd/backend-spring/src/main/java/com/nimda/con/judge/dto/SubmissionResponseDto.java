package com.nimda.con.judge.dto;

import com.nimda.con.judge.entity.Submission;
import com.nimda.con.judge.enums.JudgeStatus;
import com.nimda.con.judge.enums.Language;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.time.LocalDateTime;

@Data
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class SubmissionResponseDto {
    private Long id;
    private Long userId;
    private String userName;
    private Long problemId;
    private String problemTitle;
    private String code;
    private Language language;
    private JudgeStatus status;
    private LocalDateTime submittedAt;

    // JudgeResult 정보도 필요하다면 추가
    private String executionTime; // 예: "120ms"
    private String memoryUsage; // 예: "12MB"

    public static SubmissionResponseDto from(Submission submission) {
        return SubmissionResponseDto.builder()
                .id(submission.getId())
                .userId(submission.getUser().getId())
                .userName(submission.getUserName())
                .problemId(submission.getProblem().getId())
                .problemTitle(submission.getProblemTitle())
                .code(submission.getCode())
                .language(submission.getLanguage())
                .status(submission.getStatus())
                .submittedAt(submission.getSubmittedAt())
                .executionTime(
                        submission.getJudgeResult() != null ? submission.getJudgeResult().getExecutionTime() + "ms"
                                : null)
                .memoryUsage(submission.getJudgeResult() != null ? submission.getJudgeResult().getMemoryUsage() + "MB"
                        : null)
                .build();
    }
}
