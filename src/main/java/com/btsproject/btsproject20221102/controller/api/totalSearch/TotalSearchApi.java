package com.btsproject.btsproject20221102.controller.api.totalSearch;

import com.btsproject.btsproject20221102.dto.CMRespDto;
import com.btsproject.btsproject20221102.service.totalSearch.TotalSearchService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.lang.Nullable;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/api")
@RequiredArgsConstructor
public class TotalSearchApi {

    private final TotalSearchService totalSearchService;

    @GetMapping("/totalsearch/board")
    public ResponseEntity<?> loadSearchBoard(@RequestParam int menuId,
                                             @RequestParam @Nullable String searchValue) throws Exception {
        return ResponseEntity.ok(new CMRespDto<>(1, "통합검색 게시물 불러오기 성공", totalSearchService.loadSearchBoard(menuId, searchValue)));
    }

    @GetMapping("/totalsearch/qna")
    public ResponseEntity<?> loadSearchQna(@RequestParam @Nullable String searchValue) throws Exception {
        return ResponseEntity.ok(new CMRespDto<>(1, "통합검색 QnA 불러오기 성공", totalSearchService.loadSearchQna(searchValue)));
    }
}
