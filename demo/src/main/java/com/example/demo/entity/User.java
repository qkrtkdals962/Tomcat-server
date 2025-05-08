package com.example.demo.entity;

import jakarta.persistence.*;
import lombok.Getter;
import lombok.Setter;

import java.time.LocalDateTime;

@Entity
@Getter
@Setter
@Table(name = "users")
public class User {

    @Id  // 이 필드는 기본 키(PK)
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(nullable = false, unique = true)  // null 불가, 중복 불가
    private String username;

    @Column(nullable = false)
    private String password;

    private LocalDateTime createdAt = LocalDateTime.now();  // 가입 시각 저장

    // Getter, Setter 생략
}
