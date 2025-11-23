package com.nimda.con.group.service;

import com.nimda.con.group.dto.GroupCreateRequest;
import com.nimda.con.group.dto.GroupMemberAddRequest;
import com.nimda.con.group.dto.GroupMemberResponse;
import com.nimda.con.group.dto.GroupResponse;
import com.nimda.con.group.entity.GroupMembership;
import com.nimda.con.group.entity.StudyGroup;
import com.nimda.con.group.repository.GroupMembershipRepository;
import com.nimda.con.group.repository.StudyGroupRepository;
import com.nimda.con.user.entity.User;
import com.nimda.con.user.service.UserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.util.StringUtils;

import java.util.List;
import java.util.stream.Collectors;
import java.security.SecureRandom;

@Service
public class GroupService {

        @Autowired
        private StudyGroupRepository studyGroupRepository; // CRUD 작업을 위한 리포지토리
        @Autowired
        private GroupMembershipRepository groupMembershipRepository;
        @Autowired
        private UserService userService;

        @Transactional
        public GroupResponse createGroup(GroupCreateRequest request) {

                // * [Exception] 실제로 존재하는 사용자인지 체크 *
                User creator = userService.findById(request.getCreatorUserId())
                                .orElseThrow(() -> new IllegalArgumentException("사용자를 찾을 수 없습니다."));

                // * [Logic] 참여 코드 자동 생성 (중복 체크 포함) *
                String participationCode = request.getParticipationCode();
                if (!StringUtils.hasText(participationCode)) {
                        participationCode = generateUniqueParticipationCode();
                } else {
                        // 사용자가 직접 입력한 경우 중복 체크
                        if (studyGroupRepository.existsByParticipationCode(participationCode)) {
                                throw new IllegalStateException("이미 사용 중인 참여 코드입니다.");
                        }
                }

                // * [Entity] StudyGroup - 스터디 그룹 엔터티 생성 *
                StudyGroup group = new StudyGroup(
                                request.getGroupName(),
                                request.getMaxMembers(),
                                participationCode,
                                Boolean.TRUE.equals(request.getIsPublic()),
                                creator);

                StudyGroup saved = studyGroupRepository.save(group);

                return GroupResponse.builder()
                                .groupId(saved.getId())
                                .groupName(saved.getGroupName())
                                .maxMembers(saved.getMaxMembers())
                                .isPublic(saved.getIsPublic())
                                .participationCode(saved.getParticipationCode())
                                .creatorUserId(saved.getCreatedBy().getId())
                                .createdAt(saved.getCreatedAt())
                                .updatedAt(saved.getUpdatedAt())
                                .build();
        }

        @Transactional
        public GroupMemberResponse addMember(Long groupId, GroupMemberAddRequest request) {

                // * [Exception] 그룹을 찾을 수 없는 경우 *
                StudyGroup group = studyGroupRepository.findById(groupId)
                                .orElseThrow(() -> new IllegalArgumentException("스터디 그룹을 찾을 수 없습니다."));

                // * [Exception] 사용자를 찾을 수 없는 경우 *
                User user = userService.findById(request.getUserId())
                                .orElseThrow(() -> new IllegalArgumentException("사용자를 찾을 수 없습니다."));

                // * [Exception] StudyGroup - 스터디 그룹 엔터티에서 정원을 초과하지 않는지 테스트 *
                if (group.isFull()) {
                        throw new IllegalStateException("그룹 정원이 가득 찼습니다.");
                }

                // * [Exception] existsByGroupAndUserAndLeftAtIsNull() - 이미 그룹에 가입된 사용자인지 테스트 *
                boolean alreadyMember = groupMembershipRepository.existsByGroupAndUserAndLeftAtIsNull(group, user);
                if (alreadyMember) {
                        throw new IllegalStateException("이미 그룹에 가입된 사용자입니다.");
                }

                // TODO: 비공개 그룹일 경우 participationCode 검증 로직 추가

                // * [Entity] GroupMembership - 그룹 멤버십 엔터티 생성 *
                GroupMembership membership = new GroupMembership(user, group, request.getRole());
                GroupMembership saved = groupMembershipRepository.save(membership); // DB 저장

                // * ID를 미리 가져와서 Lazy loading 문제 방지 *
                Long savedGroupId = group.getId();
                Long userId = user.getId();
                String userName = user.getUserName();

                // * [Response] GroupMemberResponse - 그룹 멤버십 응답 객체 생성 *
                return GroupMemberResponse.builder()
                                .membershipId(saved.getId())
                                .groupId(savedGroupId)
                                .userId(userId)
                                .userName(userName)
                                .role(saved.getRole())
                                .active(saved.isActive())
                                .joinedAt(saved.getJoinedAt())
                                .leftAt(saved.getLeftAt())
                                .build();
        }

        // * 모든 스터디 그룹 조회 API *
        // * DB에 젖아된 모든 스터디그룹을 조회해서 GroupResponse 객체로 변환해 리턴한다.
        @Transactional(readOnly = true)
        public List<GroupResponse> getAllGroups() {
                return studyGroupRepository.findAll().stream()
                                .map(group -> GroupResponse.builder()
                                                .groupId(group.getId())
                                                .groupName(group.getGroupName())
                                                .maxMembers(group.getMaxMembers())
                                                .isPublic(group.getIsPublic())
                                                .participationCode(group.getParticipationCode())
                                                .creatorUserId(group.getCreatedBy().getId())
                                                .createdAt(group.getCreatedAt())
                                                .updatedAt(group.getUpdatedAt())
                                                .build())
                                .collect(Collectors.toList());
        }

        // * 스터디 그룹 멤버 조회 API *
        // * 특정 그룹의 활성 멤버들을 조회해서 GroupMemberResponse 리스트로 반환한다.
        @Transactional(readOnly = true)
        public List<GroupMemberResponse> getGroupMembers(Long groupId) {

                // * [Exception] 그룹을 찾을 수 없는 경우 *
                StudyGroup group = studyGroupRepository.findById(groupId)
                                .orElseThrow(() -> new IllegalArgumentException("스터디 그룹을 찾을 수 없습니다."));

                // * 활성 멤버 조회 (leftAt이 null인 멤버들) *
                List<GroupMembership> activeMembers = groupMembershipRepository.findAllByGroupAndLeftAtIsNull(group);

                return activeMembers.stream()
                                .map(membership -> GroupMemberResponse.builder()
                                                .membershipId(membership.getId())
                                                .groupId(group.getId())
                                                .userId(membership.getUser().getId())
                                                .userName(membership.getUser().getUserName())
                                                .role(membership.getRole())
                                                .active(membership.isActive())
                                                .joinedAt(membership.getJoinedAt())
                                                .leftAt(membership.getLeftAt())
                                                .build())
                                .collect(Collectors.toList());
        }

        // * 참여 코드 생성 (대문자 + 숫자 8자리) *
        private String generateUniqueParticipationCode() {
                String characters = "ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789";
                SecureRandom random = new SecureRandom();
                StringBuilder code = new StringBuilder(8);

                // 최대 5번 재시도 (혹시 모를 중복 방지)
                for (int retry = 0; retry < 5; retry++) {
                        code.setLength(0); // 초기화
                        for (int i = 0; i < 8; i++) {
                                int index = random.nextInt(characters.length());
                                code.append(characters.charAt(index));
                        }
                        String generatedCode = code.toString();

                        if (!studyGroupRepository.existsByParticipationCode(generatedCode)) {
                                return generatedCode;
                        }
                }

                throw new IllegalStateException("참여 코드 생성에 실패했습니다. 다시 시도해주세요.");
        }

        // * 그룹 탈퇴 API *
        // * 그룹장이 탈퇴하면 그룹 삭제, 일반 멤버는 Soft Delete *
        @Transactional
        public void leaveGroup(Long groupId, Long userId) {
                StudyGroup group = studyGroupRepository.findById(groupId)
                                .orElseThrow(() -> new IllegalArgumentException("스터디 그룹을 찾을 수 없습니다."));

                User user = userService.findById(userId)
                                .orElseThrow(() -> new IllegalArgumentException("사용자를 찾을 수 없습니다."));

                // 그룹장인지 확인
                if (group.getCreatedBy().getId().equals(userId)) {
                        // 그룹장이면 그룹 삭제 (Cascade로 멤버십도 삭제됨)
                        studyGroupRepository.delete(group);
                } else {
                        // 일반 멤버면 멤버십 조회 후 탈퇴 처리 (Soft Delete)
                        GroupMembership membership = groupMembershipRepository.findByGroupAndUser(group, user)
                                        .orElseThrow(() -> new IllegalArgumentException("그룹 멤버가 아닙니다."));

                        membership.leave();
                }
        }
}
