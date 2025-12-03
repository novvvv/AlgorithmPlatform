package com.nimda.con.judge.dto;

import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;
import lombok.AllArgsConstructor;
import lombok.Data;

@Data
@AllArgsConstructor
public class SubmissionDTO {
    @NotNull(message = "사용자 ID는 필수입니다")
    private String userId;

    @NotNull(message = "문제 ID는 필수입니다") 
    private Long problemId;
    
    @NotBlank(message = "문제 제목은 필수입니다")
    private String title;

    @NotBlank(message = "소스코드는 필수입니다")
    private String code;
    
    @NotBlank(message = "언어 선택은 필수입니다")
    private String language;
    
    // 기본 생성자 명시적 추가
    public SubmissionDTO() {}
}
