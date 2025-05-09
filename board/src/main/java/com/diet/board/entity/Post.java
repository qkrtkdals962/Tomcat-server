package com.diet.board.entity;

import com.fasterxml.jackson.annotation.JsonFormat;
import jakarta.persistence.*;
import java.time.LocalDateTime;

// 테이블 안의 내용
// id           (Int)
// authorName   (String)
// title        (String)
// content      (String)
// date         (yyyy-MM-dd hh:mm:ss)
// upvotes      (Int)
// downvotes    (Int)
// views        (Int)

@Entity
public class Post {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Integer id;

    private String title;
    private String content;
    private String authorName;

    @Column(nullable = false, updatable = false)
    @JsonFormat(pattern = "yyyy-MM-dd HH:mm:ss")
    private LocalDateTime date;

    private Integer upvotes;
    private Integer downvotes;
    private Integer views;

    public Post() {
        this.date = LocalDateTime.now();
    }

    public Post(String title, String content, String authorName, Integer upvotes, Integer downvotes, Integer views) {
        this.title = title;
        this.content = content;
        this.authorName = authorName;
        this.date = LocalDateTime.now();
        this.upvotes = upvotes;
        this.downvotes = downvotes;
        this.views = views;
    }

    @PrePersist
    protected void onCreate() {
        date = LocalDateTime.now();
    }

    public Integer getId() { return id; }

    public String getTitle() { return title; }
    public void setTitle(String title) { this.title = title; }

    public String getContent() { return content; }
    public void setContent(String content) { this.content = content; }

    public String getAuthorName() { return authorName; }
    public void setAuthorName(String authorName) { this.authorName = authorName; }

    public LocalDateTime getDate() { return date;}

    public Integer getUpvotes() { return upvotes; }
    public void setUpvotes(Integer upvotes) { this.upvotes = upvotes; }

    public Integer getDownvotes() { return downvotes; }
    public void setDownvotes(Integer downvotes) { this.downvotes = downvotes; }

    public Integer getViews() { return views; }
    public void setViews(Integer views) { this.views = views; }
}