package com.nimda.con.group.dto;

import com.nimda.con.group.enums.GroupRole;
import lombok.Builder;
import lombok.Getter;

import java.time.LocalDateTime;

@Getter
@Builder
public class GroupMemberResponse {

    private Long membershipId;
    private Long groupId;
    private Long userId;
    private String username;
    private GroupRole role;
    private boolean active;
    private LocalDateTime joinedAt;
    private LocalDateTime leftAt;

}
