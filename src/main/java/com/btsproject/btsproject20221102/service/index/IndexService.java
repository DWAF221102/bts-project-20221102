package com.btsproject.btsproject20221102.service.index;

import com.btsproject.btsproject20221102.dto.index.IndexBoardListRespDto;

import java.util.List;

public interface IndexService {

    public List<IndexBoardListRespDto> loadIndexBoard(int menuId) throws Exception;

}
