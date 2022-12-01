package com.btsproject.btsproject20221102.service.index;

import com.btsproject.btsproject20221102.dto.index.AsidePriceListRespDto;
import com.btsproject.btsproject20221102.dto.index.AsideRankUserListRespDto;
import com.btsproject.btsproject20221102.dto.index.IndexBoardListRespDto;
import com.btsproject.btsproject20221102.dto.index.IndexQnAListRespDto;

import java.util.List;

public interface IndexService {

    public List<IndexBoardListRespDto> loadIndexBoard(int menuId) throws Exception;

    public List<IndexQnAListRespDto> loadIndexQnAList() throws Exception;

    public List<AsidePriceListRespDto> loadAsidePriceList() throws Exception;

    public List<AsideRankUserListRespDto> loadAsideRankUserList() throws Exception;
}
