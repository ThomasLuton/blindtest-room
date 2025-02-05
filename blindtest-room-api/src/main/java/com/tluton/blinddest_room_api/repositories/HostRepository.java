package com.tluton.blinddest_room_api.repositories;

import com.tluton.blinddest_room_api.entities.Host;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.Optional;

@Repository
public interface HostRepository extends JpaRepository<Host, Long> {

    Optional<Host> findHostByEmail(String email);
}