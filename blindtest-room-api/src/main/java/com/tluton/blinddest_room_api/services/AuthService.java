package com.tluton.blinddest_room_api.services;

import com.tluton.blinddest_room_api.configurations.utils.AuthHelper;
import com.tluton.blinddest_room_api.dtos.Credentials;
import com.tluton.blinddest_room_api.dtos.TokenInfo;
import com.tluton.blinddest_room_api.entities.Host;
import com.tluton.blinddest_room_api.errors.CodeError;
import com.tluton.blinddest_room_api.errors.BusinessError;
import com.tluton.blinddest_room_api.repositories.HostRepository;
import org.springframework.http.HttpStatus;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

@Service
@Transactional(readOnly = true)
public class AuthService {

    private final HostRepository hosts;
    private final AuthHelper authHelper;

    public AuthService(HostRepository hosts, AuthHelper authHelper) {
        this.hosts = hosts;
        this.authHelper = authHelper;
    }

    public TokenInfo signIn(Credentials inputs) throws BusinessError {
        Host user = hosts.findHostByEmail(inputs.email()).orElseThrow(() -> new BusinessError(CodeError.WrongCredentials, "Wrong credentials", HttpStatus.UNAUTHORIZED));
        if(!authHelper.matches(inputs.password(), user.getPassword())){
            throw new BusinessError(CodeError.WrongCredentials, "Wrong credentials", HttpStatus.UNAUTHORIZED);
        }
        String token = authHelper.createJWT(user.getEmail());
        return new TokenInfo(token);
    }

}
