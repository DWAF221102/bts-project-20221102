package com.btsproject.btsproject20221102.controller.api.qna;


import com.btsproject.btsproject20221102.aop.annotation.LogAspect;
import com.btsproject.btsproject20221102.aop.annotation.ValidAspect;
import com.btsproject.btsproject20221102.dto.CMRespDto;
import com.btsproject.btsproject20221102.dto.Validation.ValidationSequence;
import com.btsproject.btsproject20221102.dto.board.QnaCreateReqDto;
import com.btsproject.btsproject20221102.service.board.QnaCreateService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.validation.BindingResult;
import org.springframework.validation.annotation.Validated;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RequestMapping("/api/qna")
@RestController
@RequiredArgsConstructor
public class QnaApi {

    private final QnaCreateService qnaCreateService;

    @ValidAspect
    @LogAspect
    @PostMapping("")
    public ResponseEntity<?> qnaCreate(@Validated(ValidationSequence.class) QnaCreateReqDto qnaCreateReqDto, BindingResult bindingResult) throws Exception{

        return ResponseEntity
                .created(null)
                .body(new CMRespDto<>(1,"Successfully",qnaCreateService.qnaCreate(qnaCreateReqDto)));
    }

}
