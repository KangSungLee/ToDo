package com.example.to.security;

import com.auth0.jwt.JWT;
import com.auth0.jwt.algorithms.Algorithm;
import java.util.Date;

public class JwtTokenUtil {

    private static final String SECRET_KEY = "secret";  // 비밀 키 설정

    // JWT 생성
    public static String createToken(String email) {
        Algorithm algorithm = Algorithm.HMAC256(SECRET_KEY);
        return JWT.create()
                .withSubject(email)
                .withIssuedAt(new Date())
                .withExpiresAt(new Date(System.currentTimeMillis() + 3600000))  // 만료 시간 1시간
                .sign(algorithm);
    }
}
