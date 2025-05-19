package com.example.food.service;

import com.example.food.entity.Food;
import java.util.List;

public interface FoodService {
    List<Food> getAllFoods();
    Food addFood(Food food);
}
