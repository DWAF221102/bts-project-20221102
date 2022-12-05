package com.btsproject.btsproject20221102.controller.api.board;

import com.btsproject.btsproject20221102.dto.CMRespDto;
import com.btsproject.btsproject20221102.service.auth.PrincipalDetails;
import com.btsproject.btsproject20221102.service.board.BoardService;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.web.bind.annotation.*;

@Slf4j
@RestController
@RequestMapping("/api")
@RequiredArgsConstructor
public class ArticleApi {

    private final BoardService boardService;

    @PutMapping("/viewcount")
    public ResponseEntity<?> viewCount(@RequestParam int id) throws Exception {

        return ResponseEntity.ok(new CMRespDto<>(1, "Successfully", boardService.viewCount(id)));
    }

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

        return ResponseEntity.ok(new CMRespDto<>(1, "Successfully", boardService.likeRemove(id)));
    }

    @GetMapping("/comment/write")
    public ResponseEntity<?> commentWrite(@RequestParam int id,
                                          @RequestParam int userId,
                                          @RequestParam String textValue) throws Exception {



        return ResponseEntity.ok(new CMRespDto<>(1, "Successfully",boardService.commentWrite(id, userId, textValue)));
    }

    @GetMapping("/recomment/write")
    public ResponseEntity<?> recommentWrite(@RequestParam int commentId,
                                            @RequestParam int userId,
                                            @RequestParam String textValue) throws Exception {

        return ResponseEntity.ok(new CMRespDto<>(1, "Successfully",boardService.recommentWrite(commentId, userId, textValue)));
    }

    @DeleteMapping("/article/delete/{id}")
    public ResponseEntity<?> delete(@PathVariable int id) throws Exception {
        return ResponseEntity.ok(new CMRespDto<>(1, "게시물 삭제 완료", boardService.deleteArticle(id)));
    }

}
