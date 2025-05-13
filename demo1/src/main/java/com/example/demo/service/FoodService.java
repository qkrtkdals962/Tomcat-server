package com.example.demo.service;

import com.example.demo.entity.Food;
import java.util.List;

public interface FoodService {
    List<Food> getAllFoods();
    Food addFood(Food food);
}
