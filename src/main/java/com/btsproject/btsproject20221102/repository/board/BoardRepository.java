package com.btsproject.btsproject20221102.repository.board;

import com.btsproject.btsproject20221102.domain.Article;
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

    public Article loadArticle(int id)  throws Exception;

    public int likeAdd(Map<String, Integer> map) throws Exception;

    public int likeRemove(int id) throws Exception;

    public List<BoardImgFile> getBoardImgList(int boardId) throws Exception;

    public int deleteArticle(int id) throws Exception;

}
