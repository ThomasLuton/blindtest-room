package com.tluton.blinddest_room_api.controllers;

import com.nimbusds.oauth2.sdk.auth.JWTAuthentication;
import com.tluton.blinddest_room_api.dtos.CodeSession;
import com.tluton.blinddest_room_api.dtos.SessionInfo;
import com.tluton.blinddest_room_api.services.SessionService;
import jakarta.validation.Valid;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.messaging.simp.SimpMessagingTemplate;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.security.core.userdetails.UserDetails;
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

}
