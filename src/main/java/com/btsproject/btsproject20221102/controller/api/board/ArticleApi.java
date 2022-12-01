package com.btsproject.btsproject20221102.controller.api.board;

import com.btsproject.btsproject20221102.dto.CMRespDto;
import com.btsproject.btsproject20221102.service.board.BoardService;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@Slf4j
@RestController
@RequestMapping("/api")
@RequiredArgsConstructor
public class ArticleApi {

    private final BoardService boardService;

    @GetMapping("/article/{id}")
    public ResponseEntity<?> loadArticle(@PathVariable int id) throws Exception {


        return ResponseEntity.ok(new CMRespDto<>(1, "Successfully", boardService.loadArticle(id)));
    }

    @GetMapping("/like/add")
    public ResponseEntity<?> likeAdd(@RequestParam int id, @RequestParam int userId) throws Exception {

        return ResponseEntity.ok(new CMRespDto<>(1, "Successfully", boardService.likeAdd(id, userId)));
    }

    @DeleteMapping("/like/remove/{id}")
    public ResponseEntity<?> likeRemove(@PathVariable int id) throws Exception {
        log.info("값 >> {}", boardService.likeRemove(id));

        return ResponseEntity.ok(new CMRespDto<>(1, "Successfully", boardService.likeRemove(id)));
    }
}
