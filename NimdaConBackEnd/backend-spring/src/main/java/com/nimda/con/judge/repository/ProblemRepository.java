package com.nimda.con.judge.repository;

import com.nimda.con.group.entity.StudyGroup;
import com.nimda.con.judge.entity.Problem;
import com.nimda.con.judge.enums.Difficulty;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Optional;

@Repository
public interface ProblemRepository extends JpaRepository<Problem, Long> {

    /**
     * 문제 제목으로 검색
     */
    Optional<Problem> findByTitle(String title);

    /**
     * 난이도별 문제 조회
     */
    List<Problem> findByDifficulty(Difficulty difficulty);

    /**
     * 문제 제목에 키워드가 포함된 문제들 검색
     */
    @Query("SELECT p FROM Problem p WHERE p.title LIKE %:keyword%")
    List<Problem> findByTitleContaining(String keyword);

    /**
     * 최근 생성된 문제들 조회
     */
    @Query("SELECT p FROM Problem p ORDER BY p.createdAt DESC LIMIT 10")
    List<Problem> findTop10ByOrderByCreatedAtDesc();

    /**
     * 특정 그룹의 문제들 조회
     */
    List<Problem> findByGroupId(Long groupId);

    /**
     * 그룹에 속하지 않은 문제들 조회 (전역 문제)
     */
    List<Problem> findByGroupIsNull();

    /**
     * 특정 그룹의 문제들 조회 (StudyGroup 엔터티로)
     */
    List<Problem> findByGroup(StudyGroup group);

}
