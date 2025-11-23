package com.nimda.con.user.repository;

import com.nimda.con.user.entity.User;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.Optional;

@Repository
public interface UserRepository extends JpaRepository<User, Long> {

    /**
     * 사용자명으로 사용자 찾기
     */
    Optional<User> findByUserName(String userName);

    /**
     * user_id로 사용자 찾기
     */
    Optional<User> findByUserId(String userId);

    /**
     * 이메일로 사용자 찾기
     */
    Optional<User> findByEmail(String email);

    /**
     * 사용자명이 존재하는지 확인
     */
    boolean existsByUserName(String userName);

    /**
     * user_id가 존재하는지 확인
     */
    boolean existsByUserId(String userId);

    /**
     * 이메일이 존재하는지 확인
     */
    boolean existsByEmail(String email);

}
