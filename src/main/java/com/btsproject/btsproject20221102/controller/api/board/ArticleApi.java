package com.btsproject.btsproject20221102.controller.api.board;

import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/api")
public class ArticleApi {

    @GetMapping("/article/{id}")
    public ResponseEntity<?> loadArticle(@PathVariable int id) throws Exception {

        return ResponseEntity.ok(null);
    }
}
