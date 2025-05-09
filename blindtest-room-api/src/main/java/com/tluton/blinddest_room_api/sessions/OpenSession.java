package com.tluton.blinddest_room_api.sessions;

import com.tluton.blinddest_room_api.dtos.SessionInfo;
import com.tluton.blinddest_room_api.errors.BusinessError;
import com.tluton.blinddest_room_api.errors.CodeError;
import org.springframework.http.HttpStatus;

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

    public void addPlayer(Player player){
        if(players.contains(player)){
            throw new BusinessError(CodeError.NameTaken, "Name already take", HttpStatus.BAD_REQUEST);
        }
        players.add(player);
    }

    public void removePlayer(Player player){
        players.remove(player);
    }

    public Set<Player> getPlayers() {
        return Collections.unmodifiableSet(players);
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
