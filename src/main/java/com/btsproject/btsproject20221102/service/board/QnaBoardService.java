package com.btsproject.btsproject20221102.service.board;

import com.btsproject.btsproject20221102.domain.QnaImgFile;
import com.btsproject.btsproject20221102.dto.board.QnaBoardRespDto;
import com.btsproject.btsproject20221102.dto.board.QnaCreateReqDto;
import com.btsproject.btsproject20221102.dto.board.QnaCreateRespDto;
import org.springframework.web.multipart.MultipartFile;

import java.util.List;

public interface QnaBoardService {
    public QnaImgFile qnaUploadImgService(MultipartFile file);

    public boolean saveQnaBoard(QnaCreateReqDto qnaCreateReqDto) throws Exception;

    public boolean deleteImg(MultipartFile file);

    public List<QnaBoardRespDto> loadQnaBoard(int page,

                                              int categoryId,
                                              String subcategoryId,
                                              String statusId,
                                              String showList,
                                              String searchValue) throws Exception;

//    public boolean deleteQnAArticle(int id) throws Exception;
}
