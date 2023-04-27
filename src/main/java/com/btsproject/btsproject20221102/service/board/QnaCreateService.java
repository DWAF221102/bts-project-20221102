package com.btsproject.btsproject20221102.service.board;


import com.btsproject.btsproject20221102.dto.board.*;

import java.util.List;

public interface QnaCreateService {
    public boolean qnaCreate(QnaCreateReqDto qnaCreateReqDto) throws Exception;


    public QnaCreateRespDto getQnaArticle(int id) throws Exception;
    public QnaAnswerInfoRespDto getAnswerInfo(int id) throws Exception;
    

    public boolean deleteQna(int id) throws Exception;

    public QnaUpdateRespDto loadQnaUpdate(int id) throws Exception;
    boolean qnaUpdateArticle(QnaUpdateReqDto qnaUpdateReqDto) throws Exception;

    boolean updateDeleteArticle(QnaDeleteReqDto qnaDeleteReqDto) throws Exception;

}
