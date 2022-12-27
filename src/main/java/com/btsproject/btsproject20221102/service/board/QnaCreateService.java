package com.btsproject.btsproject20221102.service.board;


import com.btsproject.btsproject20221102.dto.board.QnaCreateReqDto;
import com.btsproject.btsproject20221102.dto.board.QnaCreateRespDto;
import com.btsproject.btsproject20221102.dto.board.QnaUpdateRespDto;

import java.util.List;

public interface QnaCreateService {
    public boolean qnaCreate(QnaCreateReqDto qnaCreateReqDto) throws Exception;


    public QnaCreateRespDto getQnaArticle(int id) throws Exception;
    

    public boolean deleteQna(int id) throws Exception;

    public QnaUpdateRespDto loadQnaUpdate(int id) throws Exception;


}
