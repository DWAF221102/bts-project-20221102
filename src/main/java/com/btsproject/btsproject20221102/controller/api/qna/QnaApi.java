package com.btsproject.btsproject20221102.controller.api.qna;


import com.btsproject.btsproject20221102.aop.annotation.LogAspect;
import com.btsproject.btsproject20221102.aop.annotation.ValidAspect;
import com.btsproject.btsproject20221102.domain.Qna;
import com.btsproject.btsproject20221102.dto.CMRespDto;
import com.btsproject.btsproject20221102.dto.Validation.ValidationSequence;
import com.btsproject.btsproject20221102.dto.board.QnaCreateReqDto;
import com.btsproject.btsproject20221102.dto.board.QnaCreateRespDto;
import com.btsproject.btsproject20221102.service.board.QnaBoardService;
import com.btsproject.btsproject20221102.service.board.QnaCreateService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.lang.Nullable;
import org.springframework.validation.BindingResult;
import org.springframework.validation.annotation.Validated;
import org.springframework.web.bind.annotation.*;

import javax.validation.Valid;

@RequestMapping("/api/qna")
@RestController
@RequiredArgsConstructor
public class QnaApi {

    private final QnaCreateService qnaCreateService;

    @ValidAspect
    @LogAspect
    @PostMapping("/")
    public ResponseEntity<?> qnaCreate(@Validated(ValidationSequence.class) QnaCreateReqDto qnaCreateReqDto, BindingResult bindingResult) throws Exception{
//        디비에 여러개 넣기
//        String qnaName = qnaCreateReqDto.getTitle();
//        for(int i = 0; i <200; i++) {
//            if(i % 4 ==0) {
//                qnaCreateReqDto.setTitle(qnaName + "-" + (i + 1));
//            }
//            qnaCreateService.qnaCreate(qnaCreateReqDto);
//        }

        return ResponseEntity
                .created(null)
                .body(new CMRespDto<>(1,"Successfully",qnaCreateService.qnaCreate(qnaCreateReqDto)));
    }

    @GetMapping("/qnaLists/{id}")
     public ResponseEntity<?> getQnaCreateList(@PathVariable int id) throws Exception {


        return ResponseEntity.ok(new CMRespDto<>(1, "Successfully", qnaCreateService.getQnaArticle(id)));
     }

     @DeleteMapping("/qnaLists/{qnaListId}")
     public ResponseEntity<?> deleteProduct(@PathVariable int id) throws Exception {
         return ResponseEntity.ok(new CMRespDto<>(1, "Successfully", qnaCreateService.deleteQna(id)));
     }

     private final QnaBoardService qnaBoardService;
     @GetMapping("/board")
    public ResponseEntity<?> loadQnaBoard(@RequestParam int page,
                                         @RequestParam @Nullable int categoryId,
                                         @RequestParam @Nullable String subcategoryId,
                                         @RequestParam @Nullable String statusId,
                                         @RequestParam @Nullable String showList,
                                         @RequestParam @Nullable String searchValue) throws Exception {
        return ResponseEntity.ok(new CMRespDto<>(1, "Successfully",
                qnaBoardService.loadQnaBoard(page, categoryId, subcategoryId, statusId, showList, searchValue)));

     }
}
