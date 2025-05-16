package com.example.users.entity;

import jakarta.persistence.*;
import lombok.*;

import java.time.LocalDateTime;

@Entity
@Table(name = "users")
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class User {

    @Id
    @Column(nullable = false, unique = true)
    private String email; // 이메일을 PK로 사용

    @Column(nullable = false, unique = true)
    private String username;

    @Column(nullable = false)
    private String password;

    private LocalDateTime createdAt = LocalDateTime.now();
}
