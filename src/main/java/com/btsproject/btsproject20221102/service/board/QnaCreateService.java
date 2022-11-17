package com.btsproject.btsproject20221102.service.board;


import com.btsproject.btsproject20221102.dto.board.QnaCreateReqDto;

public interface QnaCreateService {
    public boolean qnaCreate(QnaCreateReqDto qnaCreateReqDto) throws Exception;

    public void getQnaList(int pageNumber, String category, String searchText) throws Exception;


}
