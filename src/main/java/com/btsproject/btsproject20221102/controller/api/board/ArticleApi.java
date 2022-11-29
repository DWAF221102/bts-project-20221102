package com.btsproject.btsproject20221102.controller.api.board;

import com.btsproject.btsproject20221102.dto.CMRespDto;
import com.btsproject.btsproject20221102.service.board.BoardService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/api")
@RequiredArgsConstructor
public class ArticleApi {

    private final BoardService boardService;

    @GetMapping("/article/{id}")
    public ResponseEntity<?> loadArticle(@PathVariable int id) throws Exception {
        ;

        return ResponseEntity.ok(new CMRespDto<>(1, "Successfully", boardService.loadArticle(id)));
    }
}
