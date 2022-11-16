package com.btsproject.btsproject20221102.repository.qna;

import com.btsproject.btsproject20221102.domain.Qna;
import com.btsproject.btsproject20221102.domain.QnaImgFile;
import org.apache.ibatis.annotations.Mapper;

import java.util.List;

@Mapper
public interface QnaRepository {

    public int saveQna(Qna qna ) throws Exception;
    public int saveImgFiles(List<QnaImgFile> qna_img_files) throws Exception;
}
