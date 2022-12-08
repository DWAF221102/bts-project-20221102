package com.btsproject.btsproject20221102.controller.api.board;

import com.btsproject.btsproject20221102.dto.CMRespDto;
import com.btsproject.btsproject20221102.dto.board.ArticleDeleteReqDto;
import com.btsproject.btsproject20221102.dto.board.UpdateCancelReqDto;
import com.btsproject.btsproject20221102.dto.board.UpdateReqDto;
import com.btsproject.btsproject20221102.service.board.BoardService;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@Slf4j
@RestController
@RequestMapping("/api")
@RequiredArgsConstructor
public class UpdateApi {

    final private BoardService boardService;

    @GetMapping("/update/{id}")
    public ResponseEntity<?> loadUpdateArticle(@PathVariable int id) throws Exception {

        return ResponseEntity.ok(new CMRespDto<>(1, "Successfully", boardService.loadUpdateArticle(id)));
    }

    @PutMapping("/update")
    public ResponseEntity<?> updateArticle(UpdateReqDto updateReqDto) throws Exception {

        log.info("{}", updateReqDto);
        return ResponseEntity.ok(new CMRespDto<>(1, "Successfully", boardService.updateArticle(updateReqDto)));
    }

    @DeleteMapping("/update/cancel")
    public ResponseEntity<?> updateCancelReq(UpdateCancelReqDto updateCancelReqDto) throws Exception {

        return ResponseEntity.ok(new CMRespDto<>(1, "Successfully", boardService.updateCancel(updateCancelReqDto)));
    }

    @DeleteMapping("/article/delete")
    public ResponseEntity<?> boardDeleteReq(ArticleDeleteReqDto articleDeleteReqDto) throws Exception {

        return ResponseEntity.ok(new CMRespDto<>(1, "Successfully", boardService.deleteArticle(articleDeleteReqDto)));
    }
}
