package com.tluton.blinddest_room_api.configurations.utils;

import com.auth0.jwt.JWT;
import com.auth0.jwt.algorithms.Algorithm;
import org.springframework.data.relational.core.sql.In;
import org.springframework.security.crypto.password.PasswordEncoder;

import java.time.Instant;
import java.util.List;

public class AuthHelper {

    private final String issuer;
    private final long expiration;
    private final Algorithm algorithm;
    private final PasswordEncoder encoder;

    private AuthHelper(Builder builder){
        this.issuer = builder.issuer;
        this.expiration = builder.expiration;
        this.algorithm = builder.algorithm;
        this.encoder = builder.encoder;
    }

    public Boolean matches(String candidate, String hash){
        return encoder.matches(candidate, hash);
    }

    public String createJWT(String email){
        Instant now = Instant.now();
        Instant expirationTime = now.plusSeconds(expiration);
        return JWT.create()
                .withIssuer(issuer)
                .withSubject(email)
                .withIssuedAt(now)
                .withExpiresAt(expirationTime)
                .sign(algorithm);
    }

    public void verifyToken(String token) throws Exception{
        algorithm.verify(JWT.decode(token));
    }

    public static class Builder {
        private String issuer;
        private long expiration;
        private Algorithm algorithm;
        private PasswordEncoder encoder;

        public Builder() {

        }

        public Builder issuer(String issuer) {
            this.issuer = issuer;
            return this;
        }

        public Builder expiration(long expiration) {
            this.expiration = expiration;
            return this;
        }

        public Builder algorithm(Algorithm algorithm) {
            this.algorithm = algorithm;
            return this;
        }

        public Builder encode(
                PasswordEncoder encoder) {
            this.encoder = encoder;
            return this;
        }

        public AuthHelper build() {
            return new AuthHelper(this);
        }
    }

}
