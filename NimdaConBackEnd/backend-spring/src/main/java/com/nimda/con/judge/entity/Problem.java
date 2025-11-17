package com.nimda.con.judge.entity;

import com.nimda.con.group.entity.StudyGroup;
import com.nimda.con.judge.enums.Difficulty;
import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Data;

import java.time.LocalDateTime;

@Entity
@Table(name = "problems")
@Data
@AllArgsConstructor
public class Problem {

    // * 문제 기본 정보 *
    // * Id : 문제 id (pk)
    // * title : 문제 제목
    // * description : 문제 설명 TEXT(65,535)

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(nullable = false, length = 200)
    private String title;

    @Column(columnDefinition = "TEXT", nullable = false)
    private String description;

    private Integer timeLimit; // 시간 제한 (밀리초, 기본 5000ms)
    private Integer memoryLimit; // 메모리 제한 (KB, 기본 256MB)

    @Enumerated(EnumType.STRING)
    private Difficulty difficulty;

    @Column(length = 50)
    private String language; // 프로그래밍 언어

    // 스터디 그룹 관계 (N:1 관계 - 여러 문제가 하나의 그룹에 속함)
    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "group_id", nullable = true)
    private StudyGroup group;

    @Column(name = "created_at")
    private LocalDateTime createdAt;

    @Column(name = "updated_at")
    private LocalDateTime updatedAt;

    // 기본 생성자
    public Problem() {
        LocalDateTime now = LocalDateTime.now();
        this.createdAt = now;
        this.updatedAt = now;
    }

    // 생성용 생성자
    public Problem(String title, String description, Difficulty difficulty) {
        this();
        this.title = title;
        this.description = description;
        this.difficulty = difficulty;
    }

    @PrePersist
    public void prePersist() {
        LocalDateTime now = LocalDateTime.now();
        if (this.createdAt == null) {
            this.createdAt = now;
        }
        if (this.updatedAt == null) {
            this.updatedAt = now;
        }

        // 기본값 설정
        if (this.timeLimit == null) {
            this.timeLimit = 5000;
        }
        if (this.memoryLimit == null) {
            this.memoryLimit = 256 * 1024; // 256MB를 KB로
        }
    }

    @PreUpdate
    public void preUpdate() {
        this.updatedAt = LocalDateTime.now();
    }

    // 시간 정보 헬퍼 메서드
    public LocalDateTime getCreatedAt() {
        return this.createdAt;
    }

    public LocalDateTime getUpdatedAt() {
        return this.updatedAt;
    }

}
