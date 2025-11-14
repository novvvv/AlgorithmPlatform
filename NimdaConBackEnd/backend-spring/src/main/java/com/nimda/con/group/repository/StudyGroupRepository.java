package com.nimda.con.group.repository;

import com.nimda.con.group.entity.StudyGroup;
import org.springframework.data.jpa.repository.JpaRepository;

public interface StudyGroupRepository extends JpaRepository<StudyGroup, Long> {

    boolean existsByParticipationCode(String participationCode);
}
