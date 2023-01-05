package com.btsproject.btsproject20221102.repository.qna;

import com.btsproject.btsproject20221102.domain.*;
import com.btsproject.btsproject20221102.dto.board.QnaCreateRespDto;
import org.apache.ibatis.annotations.Mapper;

import java.util.List;
import java.util.Map;

@Mapper
public interface QnaRepository {

    public int saveQna(Qna qna ) throws Exception;
    public int saveImgFiles(List<QnaImgFile> qna_img_files) throws Exception;
    public List<Qna> getQnaList(int id) throws Exception;

    public QnaArticle infoQna(int id) throws Exception;

    public int deleteQna(int id) throws Exception;

    public List<QnaImgFile> getQnaImgList(int id) throws Exception;


    public List<QnaLoadList> qnaLoadBoard(Map<String, Object> map) throws Exception;

    public QnaUpdateArticle updateInfoQna(int id) throws Exception;

    public int updateDelete(int id) throws Exception;
}
