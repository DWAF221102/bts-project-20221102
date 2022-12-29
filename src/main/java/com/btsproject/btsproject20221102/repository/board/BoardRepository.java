package com.btsproject.btsproject20221102.repository.board;

import com.btsproject.btsproject20221102.domain.*;
import org.apache.ibatis.annotations.Mapper;

import java.util.List;
import java.util.Map;

@Mapper
public interface BoardRepository {
    // -----write-----
    public int saveBoard(Board board) throws Exception;
    public int saveBoardImg(List<BoardImgFile> files) throws Exception;

    // -------board------
    public List<LoadList> loadBoard(Map<String, Object> map) throws Exception;

    // -------article------
    public int viewCount(int id) throws Exception;
    public Article loadArticle(int id)  throws Exception;
    public int likeAdd(Map<String, Integer> map) throws Exception;
    public int likeRemove(int id) throws Exception;
    public int commentWrite(Map<String, Object> map) throws Exception;
    public int recommentWrite(Map<String, Object> map) throws Exception;
    public List<BoardImgFile> getBoardImgList(int boardId) throws Exception;
    public int commentDelete(int id) throws Exception;
    public int recommentDelete(int id) throws Exception;


//    -----update------
    public UpdateArticle loadUpdateArticle(int id) throws Exception;
    public int updateArticle(UpdateArticle updateArticle) throws Exception;
    public int deleteArticle(int id) throws Exception;
}
