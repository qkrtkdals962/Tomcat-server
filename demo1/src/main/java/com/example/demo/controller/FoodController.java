package com.example.demo.controller;

import com.example.demo.entity.Food;
import com.example.demo.repository.FoodRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@CrossOrigin(origins = "http://localhost:3000")
@RestController
@RequestMapping("/foods")
public class FoodController {

    @Autowired
    private FoodRepository foodRepository;

    // 음식 전체 조회
    @GetMapping
    public List<Food> getAllFoods() {
        return foodRepository.findAll();
    }

    // 음식 추가
    @PostMapping
    public Food addFood(@RequestBody Food food) {
        return foodRepository.save(food);
    }
}
