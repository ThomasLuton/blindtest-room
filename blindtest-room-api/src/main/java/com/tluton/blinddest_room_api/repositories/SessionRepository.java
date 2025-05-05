package com.tluton.blinddest_room_api.repositories;

import com.tluton.blinddest_room_api.dtos.SessionInfo;
import com.tluton.blinddest_room_api.entities.Session;
import org.springframework.data.jpa.repository.JpaRepository;

import javax.swing.text.html.Option;
import java.util.Optional;

public interface SessionRepository extends JpaRepository<Session, Long> {
    boolean existsByCode(Integer code);

    Optional<SessionInfo> findSessionByCode(Integer code);

}
