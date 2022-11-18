package com.btsproject.btsproject20221102.service.board;


import com.btsproject.btsproject20221102.domain.Qna;
import com.btsproject.btsproject20221102.dto.board.QnaCreateReqDto;
import com.btsproject.btsproject20221102.dto.board.QnaCreateRespDto;

import java.util.List;

public interface QnaCreateService {
    public boolean qnaCreate(QnaCreateReqDto qnaCreateReqDto) throws Exception;

    public List<QnaCreateRespDto> getQnaList(int pageNumber, String category, String searchText) throws Exception;


}
