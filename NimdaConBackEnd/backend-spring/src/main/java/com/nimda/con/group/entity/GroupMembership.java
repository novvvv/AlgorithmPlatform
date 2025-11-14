package com.nimda.con.group.entity;

import java.time.LocalDateTime;

import org.springframework.data.annotation.CreatedDate;
import org.springframework.data.jpa.domain.support.AuditingEntityListener;

import com.nimda.con.group.enums.GroupRole;
import com.nimda.con.user.entity.User;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.EntityListeners;
import jakarta.persistence.EnumType;
import jakarta.persistence.Enumerated;
import jakarta.persistence.FetchType;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.ManyToOne;
import jakarta.persistence.Table;
import jakarta.persistence.UniqueConstraint;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Entity
@Table(name = "group_memberships", uniqueConstraints = @UniqueConstraint(columnNames = { "user_id", "group_id" }))
@EntityListeners(AuditingEntityListener.class)
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
public class GroupMembership {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "membership_id")
    private Long id;

    // 사용자 (N:1 관계)
    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "user_id", nullable = false)
    private User user;

    // 그룹 (N:1 관계)
    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "group_id", nullable = false)
    private StudyGroup group;

    // 역할
    @Enumerated(EnumType.STRING)
    @Column(nullable = false, length = 20)
    private GroupRole role;

    @CreatedDate
    @Column(name = "joined_at", nullable = false, updatable = false)
    private LocalDateTime joinedAt;

    @Column(name = "left_at")
    private LocalDateTime leftAt; // 탈퇴일 (null이면 활성 멤버)

    // 생성용 생성자
    public GroupMembership(User user, StudyGroup group, GroupRole role) {
        this.user = user;
        this.group = group;
        this.role = role;
        this.joinedAt = LocalDateTime.now();
    }

    /**
     * 멤버가 활성 상태인지 확인
     */
    public boolean isActive() {
        return leftAt == null;
    }

    /**
     * 멤버 탈퇴 처리
     */
    public void leave() {
        if (this.leftAt == null) {
            this.leftAt = LocalDateTime.now();
        }
    }

    /**
     * 역할 변경
     */
    public void changeRole(GroupRole newRole) {
        this.role = newRole;
    }
}
