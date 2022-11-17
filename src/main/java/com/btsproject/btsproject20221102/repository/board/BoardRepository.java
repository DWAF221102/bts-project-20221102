package com.btsproject.btsproject20221102.repository.board;

import com.btsproject.btsproject20221102.domain.Board;
import com.btsproject.btsproject20221102.domain.BoardImgFile;
import org.apache.ibatis.annotations.Mapper;

import java.util.List;

@Mapper
public interface BoardRepository {
    public int saveBoard(Board board) throws Exception;

    public int saveBoardImg(List<BoardImgFile> files) throws Exception;
}
