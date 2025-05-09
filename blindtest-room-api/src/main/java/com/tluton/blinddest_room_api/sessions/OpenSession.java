package com.tluton.blinddest_room_api.sessions;

import com.tluton.blinddest_room_api.dtos.SessionInfo;

import java.util.Collections;
import java.util.HashSet;
import java.util.Objects;
import java.util.Set;

public class OpenSession {
    private final Set<Player> players = new HashSet<>();
    private final SessionInfo session;

    public OpenSession(SessionInfo session){
        this.session = session;
    }

    public Set<Player> getPlayers() {
        return players;
    }

    public SessionInfo getSession() {
        return session;
    }

    @Override
    public boolean equals(Object o) {
        if (this == o) return true;
        if (o == null || getClass() != o.getClass()) return false;
        OpenSession that = (OpenSession) o;
        return Objects.equals(session, that.session);
    }

    @Override
    public int hashCode() {
        return Objects.hash(session);
    }
}
