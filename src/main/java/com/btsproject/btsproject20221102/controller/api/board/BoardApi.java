package com.btsproject.btsproject20221102.controller.api.board;

import com.btsproject.btsproject20221102.aop.annotation.LogAspect;
import com.btsproject.btsproject20221102.dto.CMRespDto;
import com.btsproject.btsproject20221102.dto.board.BoardRespDto;
import com.btsproject.btsproject20221102.service.board.BoardService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.lang.Nullable;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;

@RestController
@RequestMapping("/api")
@RequiredArgsConstructor
public class BoardApi {

    private final BoardService boardService;

    @GetMapping("/board")
    public ResponseEntity<?> loadBoard(@RequestParam int page,
                                    @RequestParam int menuId,
                                    @RequestParam @Nullable int categoryId,
                                    @RequestParam @Nullable String subcategoryId,
                                    @RequestParam @Nullable String showList,
                                    @RequestParam @Nullable  String searchValue) throws Exception {


        return ResponseEntity.ok(new CMRespDto<>(1, "SucessFully",
                boardService.loadBoard(page, menuId, categoryId, subcategoryId ,showList, searchValue)));
    }
}
