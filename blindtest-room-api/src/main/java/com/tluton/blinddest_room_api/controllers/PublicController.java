package com.tluton.blinddest_room_api.controllers;

import com.tluton.blinddest_room_api.dtos.CodeSession;
import com.tluton.blinddest_room_api.dtos.PublicSessionInfo;
import com.tluton.blinddest_room_api.dtos.SessionInfo;
import com.tluton.blinddest_room_api.dtos.UpdatePlayerName;
import com.tluton.blinddest_room_api.services.SessionService;
import com.tluton.blinddest_room_api.sessions.Player;
import com.tluton.blinddest_room_api.sessions.SessionManager;
import jakarta.validation.Valid;
import org.aspectj.apache.bcel.classfile.Code;
import org.springframework.messaging.simp.SimpMessagingTemplate;
import org.springframework.web.bind.annotation.*;

import java.util.Collections;
import java.util.List;
import java.util.Set;

@RestController
@RequestMapping("/public")
public class PublicController {

    private final SimpMessagingTemplate template;
    private final SessionService sessionService;
    private final SessionManager sessionManager;

    public PublicController(SimpMessagingTemplate template, SessionService sessionService, SessionManager sessionManager){
        this.template = template;
        this.sessionService = sessionService;
        this.sessionManager = sessionManager;
    }

    @GetMapping("/{code}")
    public SessionInfo getSessionInfo(@PathVariable("code") Integer code){
        return sessionService.getSessionInfo(code);
    }

    @GetMapping("/players/{code}")
    public List<Player> getPlayers(@PathVariable("code") Integer code){
        return sessionManager.getOpenSessionBySessionInfo(code).getPlayers().stream().toList();
    }

    @PostMapping("/join")
    public void joinSession(@RequestBody @Valid CodeSession codeSession){
        PublicSessionInfo output = sessionService.joinSession(codeSession);
        template.convertAndSend("/topic/" + output.sessionInfo().code(), "A player join");
    }

    @PostMapping("/leave")
    public void leaveSession(@RequestBody @Valid CodeSession codeSession){
        PublicSessionInfo output = sessionService.leaveSession(codeSession);
        template.convertAndSend("/topic/" + output.sessionInfo().code(), "A player leave");
    }

    @PutMapping("/update-name")
    public void updateName(@RequestBody @Valid UpdatePlayerName input){
        PublicSessionInfo output = sessionService.updatePlayerName(input);
        template.convertAndSend("/topic/" + output.sessionInfo().code(), "A player change his name");
    }

}
