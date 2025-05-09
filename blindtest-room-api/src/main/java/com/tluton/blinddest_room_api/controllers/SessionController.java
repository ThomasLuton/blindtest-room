package com.tluton.blinddest_room_api.controllers;

import com.tluton.blinddest_room_api.dtos.UpdatePlaylist;
import com.tluton.blinddest_room_api.dtos.SessionInfo;
import com.tluton.blinddest_room_api.entities.Session;
import com.tluton.blinddest_room_api.services.SessionService;
import jakarta.validation.Valid;
import org.springframework.http.HttpStatus;
import org.springframework.messaging.simp.SimpMessagingTemplate;
import org.springframework.security.core.Authentication;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/session")
public class SessionController {

    private final SimpMessagingTemplate template;
    private final SessionService sessionService;

    public SessionController(SimpMessagingTemplate template, SessionService sessionService){
        this.template = template;
        this.sessionService = sessionService;
    }

    @PostMapping("/new")
    public SessionInfo createSession(Authentication authentication) {
        return sessionService.createSession(authentication.getName());
    }

    @GetMapping("/current")
    public SessionInfo getCurrentSession(Authentication authentication){
        return sessionService.getHostCurrentSession(authentication.getName());
    }

    @PostMapping("/current")
    @ResponseStatus(HttpStatus.NO_CONTENT)
    public void joinSession(Authentication authentication){

    }

    @PutMapping("/current/close")
    @ResponseStatus(HttpStatus.NO_CONTENT)
    public void closeCurrentSession(Authentication authentication){
        sessionService.closeCurrentSession(authentication.getName());
    }

    @PutMapping("/current/playlist")
    public SessionInfo updatePlaylist(Authentication authentication, @RequestBody @Valid UpdatePlaylist input){
        return sessionService.updatePlaylist(authentication.getName(), input);
    }
}
