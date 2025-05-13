package com.example.demo.entity;

import jakarta.persistence.*;
import lombok.Getter;
import lombok.Setter;

@Entity
@Getter
@Setter
@Table(name = "foodlist")
public class Food {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Integer id;

    @Column(nullable = false, length = 45)
    private String foodname;

    @Column(nullable = false)
    private Integer kcal;

    @Column(nullable = false)
    private Float car;

    @Column(nullable = false)
    private Float protein;

    @Column(nullable = false)
    private Float fat;
}
