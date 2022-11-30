package com.btsproject.btsproject20221102.controller.api.index;

import com.btsproject.btsproject20221102.dto.CMRespDto;
import com.btsproject.btsproject20221102.service.index.IndexService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;


@RestController
@RequestMapping("/api/index")
@RequiredArgsConstructor
public class IndexApi {

    private final IndexService indexService;


    @GetMapping("/board")
    public ResponseEntity<?> loadIndexBoard(@RequestParam int menuId) throws Exception {

        return ResponseEntity.ok(new CMRespDto<>(1, "게시물 불러오기 완료.", indexService.loadIndexBoard(menuId)));
    }

    @GetMapping("/qna")
    public ResponseEntity<?> loadIndexQnA() throws Exception {

        return ResponseEntity.ok(new CMRespDto<>(1, "QnA게시물 불러오기 완료", indexService.loadIndexQnAList()));
    }

    @GetMapping("/aside/price")
    public ResponseEntity<?> loadIndexAsidePrice() throws Exception {
        return ResponseEntity.ok(new CMRespDto<>(1, "가격 랭킹 어사이드 불러오기 완료", indexService.loadAsidePriceList()));
    }
}
