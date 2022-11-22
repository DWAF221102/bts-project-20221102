package com.btsproject.btsproject20221102.repository.board;

import com.btsproject.btsproject20221102.domain.Board;
import com.btsproject.btsproject20221102.domain.BoardImgFile;
import com.btsproject.btsproject20221102.domain.LoadList;
import org.apache.ibatis.annotations.Mapper;

import java.util.List;
import java.util.Map;

@Mapper
public interface BoardRepository {
    public int saveBoard(Board board) throws Exception;

    public int saveBoardImg(List<BoardImgFile> files) throws Exception;

    public List<LoadList> loadBoard(Map<String, Object> map) throws Exception;
}
