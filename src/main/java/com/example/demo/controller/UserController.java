package com.example.demo.controller;

import com.example.demo.entity.User;
import com.example.demo.service.UserService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.Map;

@CrossOrigin(origins = "http://localhost:3000")
@RestController
@RequiredArgsConstructor
@RequestMapping("/users")
public class UserController {

    private final UserService userService;

    @PostMapping("/register")
    public ResponseEntity<Map<String, String>> register(@RequestBody User user) {
        if (userService.existsByEmail(user.getEmail())) {
            return ResponseEntity.status(409).body(Map.of("message", "이미 등록된 이메일입니다."));
        }

        if (userService.existsByUsername(user.getUsername())) {
            return ResponseEntity.status(409).body(Map.of("message", "이미 사용 중인 사용자 이름입니다."));
        }

        userService.register(user);
        return ResponseEntity.ok(Map.of("message", "회원가입 성공"));
    }

    @PostMapping("/login")
    public ResponseEntity<Map<String, String>> login(@RequestBody User user) {
        boolean success = userService.login(user.getEmail(), user.getPassword());
        if (success) {
            return ResponseEntity.ok(Map.of("message", "로그인 성공"));
        } else {
            return ResponseEntity.status(401).body(Map.of("message", "로그인 실패"));
        }
    }
}
