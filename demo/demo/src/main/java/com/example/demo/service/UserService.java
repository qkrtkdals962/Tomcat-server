package com.example.demo.service;

import com.example.demo.entity.User;
import com.example.demo.repository.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service
public class UserService {

    @Autowired
    private UserRepository userRepository;

    public User register(User user) {
        return userRepository.save(user);
    }

    public boolean login(String username, String password) {
        return userRepository.findByUsername(username)
                .map(u -> u.getPassword().equals(password))
                .orElse(false);
    }
}
