package com.tluton.blinddest_room_api.controllers;

import com.tluton.blinddest_room_api.dtos.Credentials;
import com.tluton.blinddest_room_api.dtos.TokenInfo;
import com.tluton.blinddest_room_api.errors.BusinessError;
import com.tluton.blinddest_room_api.services.AuthService;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/auth")
public class AuthController {

    private final AuthService authService;

    public AuthController(AuthService authService){
        this.authService = authService;
    }

    @PostMapping()
    public TokenInfo signIn(@RequestBody Credentials inputs) throws BusinessError {
        return authService.signIn(inputs);
    }
}
