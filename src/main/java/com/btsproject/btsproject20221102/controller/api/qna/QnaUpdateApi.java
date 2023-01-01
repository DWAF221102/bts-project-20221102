package com.btsproject.btsproject20221102.controller.api.qna;

import com.btsproject.btsproject20221102.domain.Qna;
import com.btsproject.btsproject20221102.dto.CMRespDto;
import com.btsproject.btsproject20221102.dto.board.QnaUpdateReqDto;
import com.btsproject.btsproject20221102.dto.board.UpdateReqDto;
import com.btsproject.btsproject20221102.service.board.QnaCreateService;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@Slf4j
@RequestMapping("/api/qnaUpdate")
@RestController
@RequiredArgsConstructor
public class QnaUpdateApi {

    private final QnaCreateService qnaCreateService;

    @GetMapping("/{id}")
    public ResponseEntity<?> getQnaUpdate(@PathVariable int id) throws Exception {
        log.info("동작1");
        return ResponseEntity.ok(new CMRespDto<>(1,"Successfully", qnaCreateService.loadQnaUpdate(id)));
    }

    @PutMapping("/update")
    public ResponseEntity<?> updateArticle(QnaUpdateReqDto qnaUpdateReqDto) throws Exception {

        log.info("{}", qnaUpdateReqDto);
        return ResponseEntity.ok(new CMRespDto<>(1, "Successfully", qnaCreateService.qnaUpdateArticle(qnaUpdateReqDto)));
    }



}
