package com.tluton.blinddest_room_api.services;

import com.tluton.blinddest_room_api.dtos.CodeSession;
import com.tluton.blinddest_room_api.dtos.SessionInfo;
import com.tluton.blinddest_room_api.entities.Host;
import com.tluton.blinddest_room_api.entities.Session;
import com.tluton.blinddest_room_api.errors.BusinessError;
import com.tluton.blinddest_room_api.errors.CodeError;
import com.tluton.blinddest_room_api.repositories.HostRepository;
import com.tluton.blinddest_room_api.repositories.SessionRepository;
import com.tluton.blinddest_room_api.sessions.Step;
import org.springframework.http.HttpStatus;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.time.LocalDateTime;
import java.util.Random;

@Service
@Transactional(readOnly = true)
public class SessionService {

    private final SessionRepository sessions;
    private final HostRepository hosts;

    public SessionService(SessionRepository sessions, HostRepository hosts){
        this.sessions = sessions;
        this.hosts = hosts;
    }

    @Transactional
    public SessionInfo createSession(String userName){
        Host host = getHost(userName);
        SessionInfo sessionInfo = getHostCurrentSession(userName);
        if(sessionInfo == null){
            Session session = new Session();
            session.setHost(host);
            session.setCode(getNewSessionCode());
            session.setCreatedAt(LocalDateTime.now());
            session.setStep(Step.DRAFT);
            sessions.save(session);
            return new SessionInfo("", session.getStep(), session.getCode());
        }
        return sessionInfo;
    }

    public SessionInfo getHostCurrentSession(String userName){
        Host host = getHost(userName);
        return sessions.findFirstByHostAndStepBefore(host, Step.FINISH).orElse(null);
    }

    public SessionInfo joinSession(CodeSession codeSession){
        return sessions.findSessionByCode(codeSession.code()).orElseThrow(()-> new BusinessError(CodeError.SessionNotExist, "This session don't exist", HttpStatus.BAD_REQUEST));
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
}
