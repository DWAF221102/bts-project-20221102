package com.btsproject.btsproject20221102.service.board;

import com.btsproject.btsproject20221102.domain.QnaImgFile;
import com.btsproject.btsproject20221102.dto.board.*;
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

    public boolean questionerModal(QnaQuestionerModalReqDto qnaQuestionerModalReqDto) throws  Exception;
    public boolean answererModal(QnaAnswerModalReqDto qnaAnswerModalReqDto) throws Exception;


    // Qna 답변유저 저장
    public boolean requestUserSave(RequestUserReqDto requestUserReqDto) throws Exception;

    public boolean selectRequestUser(int id, int userId) throws Exception;

    public boolean checkRequestUser(RequestUserReqDto requestUserReqDto) throws Exception;

    // 선택된 답변자 정보 가져오기
    public RequestUserListRespDto getSelectedUser(int id) throws Exception;

    // qna 답변자목록 가져오기
    public List<RequestUserListRespDto> getRequestUserList(int qnaBoardId) throws Exception;

    // qna status 업데이트
    public boolean updateStatus(QnaStatusUpdateReqDto qnaStatusUpdateReqDto) throws Exception;
}
