package com.diet.board.controller;

import org.springframework.beans.factory.annotation.Value;
import org.springframework.http.*;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.client.RestTemplate;

import java.util.*;

@RestController
@CrossOrigin(origins = {"http://localhost:3000", "http://127.0.0.1:3000"}) // 프론트엔드 포트에 맞게 수정
public class GeminiController {

    @Value("${gemini.api.key}")
    private String geminiApiKey;

    @PostMapping("/ask-gemini")
    public String askGemini(@RequestBody String question) {
        RestTemplate restTemplate = new RestTemplate();

        String url = "https://generativelanguage.googleapis.com/v1/models/gemini-2.0-flash:generateContent?key=" + geminiApiKey;

        Map<String, Object> part = Map.of("text", question);
        Map<String, Object> content = Map.of(
                "role", "user",
                "parts", List.of(part)
        );
        Map<String, Object> requestBody = Map.of("contents", List.of(content));

        HttpHeaders headers = new HttpHeaders();
        headers.setContentType(MediaType.APPLICATION_JSON);

        HttpEntity<Map<String, Object>> request = new HttpEntity<>(requestBody, headers);

        try {
            ResponseEntity<Map> response = restTemplate.postForEntity(url, request, Map.class);
            List<Map<String, Object>> candidates = (List<Map<String, Object>>) response.getBody().get("candidates");
            Map<String, Object> contentResp = (Map<String, Object>) candidates.get(0).get("content");
            List<Map<String, String>> parts = (List<Map<String, String>>) contentResp.get("parts");

            return parts.get(0).get("text");
        } catch (Exception e) {
            return "Gemini 요청 중 오류 발생: " + e.getMessage();
        }
    }

}
