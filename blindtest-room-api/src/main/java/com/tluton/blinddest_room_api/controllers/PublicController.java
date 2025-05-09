package com.tluton.blinddest_room_api.controllers;

import com.tluton.blinddest_room_api.dtos.CodeSession;
import com.tluton.blinddest_room_api.dtos.PublicSessionInfo;
import com.tluton.blinddest_room_api.dtos.UpdatePlayerName;
import com.tluton.blinddest_room_api.services.SessionService;
import com.tluton.blinddest_room_api.sessions.Player;
import com.tluton.blinddest_room_api.sessions.SessionManager;
import jakarta.validation.Valid;
import org.springframework.messaging.simp.SimpMessagingTemplate;
import org.springframework.web.bind.annotation.*;

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

    @PostMapping("/join")
    public PublicSessionInfo joinSession(@RequestBody @Valid CodeSession codeSession){
        PublicSessionInfo output = sessionService.joinSession(codeSession);
        Set<Player> players = sessionManager.getOpenSessionBySessionInfo(output.sessionInfo()).getPlayers();
        template.convertAndSend("/topic/" + output.sessionInfo().code(),players);
        return output;
    }

    @PutMapping("/update-name")
    public void updateName(@RequestBody @Valid UpdatePlayerName input){
        PublicSessionInfo output = sessionService.updatePlayerName(input);
        Set<Player> players = sessionManager.getOpenSessionBySessionInfo(output.sessionInfo()).getPlayers();
        template.convertAndSend("/topic/" + output.sessionInfo().code(),players);
    }

}
