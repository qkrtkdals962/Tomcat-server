package com.example.users.config;

import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.web.servlet.config.annotation.CorsRegistry;
import org.springframework.web.servlet.config.annotation.WebMvcConfigurer;

@Configuration
public class WebConfig {

    @Bean
    public WebMvcConfigurer corsConfigurer() {
        return new WebMvcConfigurer() {

            @Override
            public void addCorsMappings(CorsRegistry registry) {
                registry.addMapping("/**")
                        // allowedOrigins와 allowedOriginPatterns는 동시에 쓰지 마세요
                        // "*"는 사용 금지, 아래처럼 명시적으로 작성
                        .allowedOrigins("http://localhost:3000")  // 클라이언트 주소만 명시
                        .allowedMethods("GET", "POST", "PUT", "DELETE", "OPTIONS")
                        .allowedHeaders("*")
                        .allowCredentials(true);  // 반드시 allowedOrigins가 명확해야 사용 가능
            }
        };
    }
}
