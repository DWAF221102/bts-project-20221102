package com.btsproject.btsproject20221102.repository.qna;

import com.btsproject.btsproject20221102.domain.Qna;
import com.btsproject.btsproject20221102.domain.QnaImgFile;
import org.apache.ibatis.annotations.Mapper;

import java.util.List;
import java.util.Map;

@Mapper
public interface QnaRepository {

    public int saveQna(Qna qna ) throws Exception;
    public int saveImgFiles(List<QnaImgFile> qna_img_files) throws Exception;
    public List<Qna> getQnaList(Map<String, Object> map) throws Exception;
}
