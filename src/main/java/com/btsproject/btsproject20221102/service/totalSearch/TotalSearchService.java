package com.btsproject.btsproject20221102.service.totalSearch;

import com.btsproject.btsproject20221102.dto.board.BoardRespDto;
import com.btsproject.btsproject20221102.dto.board.QnaBoardRespDto;

import java.util.List;

public interface TotalSearchService {

    public List<BoardRespDto> loadSearchBoard(int menuId,
                                              String searchValue) throws Exception;

    public List<QnaBoardRespDto> loadSearchQna(String searchValue) throws Exception;
}
