package com.example.to.controller;

import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.example.to.dto.AuthResponse;
import com.example.to.entity.User;
import com.example.to.security.JwtTokenUtil;
import com.example.to.service.UserService;

import lombok.RequiredArgsConstructor;

@RestController
@RequestMapping("/user")
@RequiredArgsConstructor
public class UserController {
	private final UserService userService; 
	
	@PostMapping("/signup")
    public ResponseEntity<String> signup(@RequestBody User user) {
		try {
			userService.insertUser(user);
            return ResponseEntity.ok("회원가입 성공");
        } catch (IllegalArgumentException e) {
            return ResponseEntity.badRequest().body(e.getMessage());
        }
    }

	@PostMapping("/login")
    public ResponseEntity<?> login(@RequestBody User user) {
        try {
            userService.userLogin(user);  // 비밀번호 확인 및 로그인 처리

            // JWT 토큰 생성
            String token = JwtTokenUtil.createToken(user.getEmail()); 

            // 응답 객체로 JWT 토큰 반환
            return ResponseEntity.ok(new AuthResponse(token)); 
        } catch (IllegalArgumentException e) {
            return ResponseEntity.badRequest().body(e.getMessage());
        }
    }
}