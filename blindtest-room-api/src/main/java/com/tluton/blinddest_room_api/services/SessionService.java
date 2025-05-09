package com.tluton.blinddest_room_api.services;

import com.tluton.blinddest_room_api.dtos.*;
import com.tluton.blinddest_room_api.entities.Host;
import com.tluton.blinddest_room_api.entities.Session;
import com.tluton.blinddest_room_api.errors.BusinessError;
import com.tluton.blinddest_room_api.errors.CodeError;
import com.tluton.blinddest_room_api.repositories.HostRepository;
import com.tluton.blinddest_room_api.repositories.SessionRepository;
import com.tluton.blinddest_room_api.sessions.Player;
import com.tluton.blinddest_room_api.sessions.SessionManager;
import com.tluton.blinddest_room_api.sessions.Step;
import org.springframework.http.HttpStatus;
import org.springframework.security.core.parameters.P;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.time.LocalDateTime;
import java.util.Random;
import java.util.Set;

@Service
@Transactional(readOnly = true)
public class SessionService {

    private final SessionRepository sessions;
    private final HostRepository hosts;

    private final SessionManager sessionManager;

    public SessionService(SessionRepository sessions, HostRepository hosts, SessionManager sessionManager){
        this.sessions = sessions;
        this.hosts = hosts;
        this.sessionManager = sessionManager;
    }

    @Transactional
    public SessionInfo createSession(String userName){
        Host host = getHost(userName);
        SessionInfo sessionInfo = getHostCurrentSession(userName);
        if(sessionInfo == null) {
            Session session = new Session();
            session.setHost(host);
            session.setCode(getNewSessionCode());
            session.setCreatedAt(LocalDateTime.now());
            session.setStep(Step.DRAFT);
            sessions.save(session);
            sessionInfo = new SessionInfo("", session.getStep(), session.getCode());
            openSession(sessionInfo);
        }
        return sessionInfo;
    }

    public SessionInfo getHostCurrentSession(String userName){
        Host host = getHost(userName);
        Session session = sessions.findFirstByHostAndStepBefore(host, Step.FINISH).orElse(null);
        if(session == null){
            return null;
        }
        return new SessionInfo(session.getPlaylist(), session.getStep(), session.getCode());
    }

    @Transactional
    public void closeCurrentSession(String userName){
        Host host = getHost(userName);
        Session session = sessions.findFirstByHostAndStepBefore(host, Step.FINISH).orElseThrow(()-> new BusinessError(CodeError.SessionNotExist, "This session don't exist", HttpStatus.NOT_FOUND));
        session.setStep(Step.FINISH);
        sessions.save(session);
        sessionManager.closeSession(new SessionInfo(session.getPlaylist(), session.getStep(), session.getCode()));
    }

    @Transactional
    public SessionInfo updatePlaylist(String userName, UpdatePlaylist input){
        Host host = getHost(userName);
        Session session = sessions.findFirstByHostAndStepBefore(host, Step.START).orElseThrow(()-> new BusinessError(CodeError.SessionNotExist, "This session don't exist", HttpStatus.NOT_FOUND));
        session.setPlaylist(input.playlist());
        sessions.save(session);
        return new SessionInfo(session.getPlaylist(), session.getStep(), session.getCode());
    }
    public PublicSessionInfo joinSession(CodeSession codeSession){
        SessionInfo sessionInfo = sessions.findSessionByCode(codeSession.code()).orElseThrow(()-> new BusinessError(CodeError.SessionNotExist, "This session don't exist", HttpStatus.NOT_FOUND));
        String playerName = codeSession.playerName();
        synchronized (this){
            if(playerName.equals("")){
                playerName = "Joueur " + sessionManager.getOpenSessionBySessionInfo(sessionInfo).getPlayers().size();
                sessionManager.addPlayer(sessionInfo, new Player(playerName, 0));
            }
        }
        return new PublicSessionInfo(sessionInfo, playerName);
    }

    public PublicSessionInfo updatePlayerName(UpdatePlayerName input){
        SessionInfo sessionInfo = sessions.findSessionByCode(input.codeSession().code()).orElseThrow(()-> new BusinessError(CodeError.SessionNotExist, "This session don't exist", HttpStatus.NOT_FOUND));
        sessionManager.updatePlayerName(sessionInfo, input.codeSession().playerName(), input.newName());
        return new PublicSessionInfo(sessionInfo, input.newName());
    }

    private Integer getNewSessionCode(){
        Integer code = new Random().nextInt(10000000, 99999999);
        while (sessions.existsByCode(code)){
            code = new Random().nextInt(10000000, 99999999);
        }
        return code;
    }
    
    private Host getHost(String userName){
        return hosts.findHostByEmail(userName).orElseThrow(()-> new BusinessError(CodeError.HostNotFound, "Host not found", HttpStatus.NOT_FOUND));
    }

    private void openSession(SessionInfo sessionInfo){
        sessionManager.openSession(sessionInfo);
        sessionManager.addPlayer(sessionInfo, new Player("Arbitre", 0));
    }
}
