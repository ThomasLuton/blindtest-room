package com.tluton.blinddest_room_api.sessions;

import com.tluton.blinddest_room_api.dtos.SessionInfo;
import com.tluton.blinddest_room_api.entities.Session;
import com.tluton.blinddest_room_api.errors.BusinessError;
import com.tluton.blinddest_room_api.errors.CodeError;
import com.tluton.blinddest_room_api.repositories.SessionRepository;
import org.springframework.beans.factory.DisposableBean;
import org.springframework.http.HttpStatus;
import org.springframework.stereotype.Component;
import org.springframework.transaction.annotation.Transactional;

import java.util.HashSet;
import java.util.List;
import java.util.Set;

@Component
@Transactional(readOnly = true)
public class SessionManager implements DisposableBean {
    private final Set<OpenSession> openSessions = new HashSet<>();
    private final SessionRepository sessions;

    public SessionManager(SessionRepository sessions) {
        this.sessions = sessions;
    }

    public void openSession(SessionInfo sessionInfo){
        openSessions.add(new OpenSession(sessionInfo));
    }

    public void closeSession(SessionInfo sessionInfo){
        OpenSession session = getOpenSessionBySessionInfo(sessionInfo);
        openSessions.remove(session);
    }

    public void addPlayer(SessionInfo sessionInfo, Player player){
        OpenSession session = getOpenSessionBySessionInfo(sessionInfo);
        session.getPlayers().add(player);
    }

    public void updatePlayerName(SessionInfo sessionInfo, String playerName, String newName){
        OpenSession session = getOpenSessionBySessionInfo(sessionInfo);
        Player player = session.getPlayers().stream()
                .filter(p-> p.getName().equals(playerName))
                .findFirst()
                .orElseThrow(()-> new BusinessError(CodeError.PlayerNotFound, "Player not found", HttpStatus.NOT_FOUND));
        player.setName(newName);
    }

    public void addPoint(SessionInfo sessionInfo, String playerName, Integer point){
        OpenSession session = getOpenSessionBySessionInfo(sessionInfo);
        Player player = session.getPlayers().stream()
                .filter(p-> p.getName().equals(playerName))
                .findFirst()
                .orElseThrow(()-> new BusinessError(CodeError.PlayerNotFound, "Player not found", HttpStatus.NOT_FOUND));
        Integer score = player.getScore();
        score += point;
        player.setScore(score);
    }

    public void removePlayer(SessionInfo sessionInfo, Player playerName){
        OpenSession session = getOpenSessionBySessionInfo(sessionInfo);
        Player player = session.getPlayers().stream()
                .filter(p-> p.getName().equals(playerName))
                .findFirst()
                .orElseThrow(()-> new BusinessError(CodeError.PlayerNotFound, "Player not found", HttpStatus.NOT_FOUND));
        session.getPlayers().remove(player);
    }

    public OpenSession getOpenSessionBySessionInfo(SessionInfo sessionInfo){
        return openSessions.stream()
                .filter(openSession -> openSession.getSession().code().equals(sessionInfo.code()))
                .findFirst()
                .orElseThrow(()-> new BusinessError(CodeError.SessionNotExist, "This session don't exist", HttpStatus.NOT_FOUND));
    }

    @Override
    @Transactional
    public void destroy(){
        List<Session> sessionsToClose = sessions.findAllByStepBefore(Step.FINISH);
        sessionsToClose.forEach((session -> {
            session.setStep(Step.EXPIRED);
            sessions.save(session);
        }));
    }
}
