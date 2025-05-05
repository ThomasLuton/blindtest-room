package com.tluton.blinddest_room_api.controllers;

import com.tluton.blinddest_room_api.dtos.CodeSession;
import com.tluton.blinddest_room_api.dtos.SessionInfo;
import com.tluton.blinddest_room_api.services.SessionService;
import jakarta.validation.Valid;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.messaging.simp.SimpMessagingTemplate;
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
    public CodeSession createSession(){
        return sessionService.createSession();
    }

}
