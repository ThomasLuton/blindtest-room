package com.tluton.blinddest_room_api.configurations;

import com.auth0.jwt.algorithms.Algorithm;
import com.tluton.blinddest_room_api.configurations.utils.AuthHelper;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.security.crypto.password.PasswordEncoder;

@Configuration
public class AuthConfig {

    @Value("${blindtestRoom.auth.rounds}")
    private int rounds;
    @Value("${blindtestRoom.auth.issuer}")
    private String issuer;
    @Value("${blindtestRoom.auth.secret}")
    private String secret;
    @Value("${blindtestRoom.auth.tokenExpiration}")
    private long tokenExpiration;

    @Bean
    public AuthHelper authHelper(){
        Algorithm algorithm = Algorithm.HMAC256(secret);
        PasswordEncoder encoder = new BCryptPasswordEncoder(rounds);

        return new AuthHelper.Builder()
                .algorithm(algorithm)
                .encode(encoder)
                .issuer(issuer)
                .expiration(tokenExpiration)
                .build();
    }

}
