package com.tluton.blinddest_room_api.configurations;

import org.springframework.beans.factory.annotation.Value;
import org.springframework.boot.autoconfigure.condition.ConditionalOnProperty;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.security.config.Customizer;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.oauth2.jwt.JwtDecoder;
import org.springframework.security.oauth2.jwt.NimbusJwtDecoder;
import org.springframework.security.oauth2.server.resource.authentication.JwtAuthenticationConverter;
import org.springframework.security.oauth2.server.resource.authentication.JwtGrantedAuthoritiesConverter;
import org.springframework.security.web.SecurityFilterChain;
import org.springframework.web.servlet.config.annotation.CorsRegistry;
import org.springframework.web.servlet.config.annotation.WebMvcConfigurer;

import javax.crypto.SecretKey;
import javax.crypto.spec.SecretKeySpec;

@Configuration
public class WebConfig implements WebMvcConfigurer {

    @Value("${blindtestRoom.cors.allowedOrigins}")
    private String[] allowedOrigins;
    @Value("${blindtestRoom.auth.secret}")
    private String secret;

    @Override
    public void addCorsMappings(CorsRegistry registry){
        registry.addMapping("/**")
                .allowedOrigins(
                        allowedOrigins
                ).allowedMethods("POST", "GET", "PUT", "PATCH", "DELETE");
    }

    @Bean
    public SecurityFilterChain configure(HttpSecurity http) throws Exception{
        http
                .cors(Customizer.withDefaults())
                .csrf(csrf -> csrf.disable())
                .authorizeHttpRequests((authz) -> authz
                        .requestMatchers("/auth").permitAll()
                        .anyRequest().authenticated())
                .oauth2ResourceServer((oauth2ResourceServer) -> oauth2ResourceServer
                        .jwt(Customizer.withDefaults()));
        return http.build();
    }

    @Bean
    JwtAuthenticationConverter authenticationConverter() {
        JwtGrantedAuthoritiesConverter autoritiesConverter = new JwtGrantedAuthoritiesConverter();
        autoritiesConverter
                .setAuthoritiesClaimName("roles");
        autoritiesConverter.setAuthorityPrefix("ROLE_");
        JwtAuthenticationConverter authenticationConverter = new JwtAuthenticationConverter();
        authenticationConverter
                .setJwtGrantedAuthoritiesConverter(
                        autoritiesConverter);
        return authenticationConverter;
    }

    @Bean
    JwtDecoder jwtdecoder() throws Exception {
        SecretKey secretKey = new SecretKeySpec(
                secret.getBytes(), "Hmacsha256");
        return NimbusJwtDecoder.withSecretKey(secretKey)
                .build();
    }
}
