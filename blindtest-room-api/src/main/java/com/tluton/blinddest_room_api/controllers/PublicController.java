package com.tluton.blinddest_room_api.controllers;

import com.tluton.blinddest_room_api.dtos.CodeSession;
import com.tluton.blinddest_room_api.dtos.SessionInfo;
import com.tluton.blinddest_room_api.services.SessionService;
import jakarta.validation.Valid;
import org.springframework.messaging.simp.SimpMessagingTemplate;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/public")
public class PublicController {

    private final SimpMessagingTemplate template;
    private final SessionService sessionService;

    public PublicController(SimpMessagingTemplate template, SessionService sessionService){
        this.template = template;
        this.sessionService = sessionService;
    }

    @PostMapping("/join")
    public SessionInfo joinSession(@RequestBody @Valid CodeSession codeSession){
        return sessionService.joinSession(codeSession);
    }

}
