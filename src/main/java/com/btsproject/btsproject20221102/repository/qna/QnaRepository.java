package com.btsproject.btsproject20221102.repository.qna;

import com.btsproject.btsproject20221102.domain.*;
import com.btsproject.btsproject20221102.dto.board.RequestUserListRespDto;
import com.btsproject.btsproject20221102.dto.board.RequestUserReqDto;
import org.apache.ibatis.annotations.Mapper;

import java.util.List;
import java.util.Map;

@Mapper
public interface QnaRepository {

    public int saveQna(Qna qna) throws Exception;
    public int saveImgFiles(List<QnaImgFile> qna_img_files) throws Exception;
    public List<Qna> getQnaList(int id) throws Exception;

    public QnaArticle infoQna(int id) throws Exception;

    public QnaAnswerInfo getAnswerInfo(int id) throws Exception;

    public int deleteQna(int id) throws Exception;

    public List<QnaImgFile> getQnaImgList(int id) throws Exception;


    public List<QnaLoadList> qnaLoadBoard(Map<String, Object> map) throws Exception;

    public QnaUpdateArticle updateInfoQna(int id) throws Exception;

    public int updateDelete(int id) throws Exception;

    // Q&A 모달창
    public int questionerModal(QnaQuestionerModal qnaQuestionerModal) throws Exception;
    public int answererModal(QnaAnswererModal answererModal) throws Exception;

    // 답변 완료후 데이터 불러오기
//    public List<LoadQnaResult> loadQnaResult(Map<String, Object> map)  throws Exception;


    // Q&A 답변자 등록
    public int requestUserSave(RequestUser requestUser) throws Exception;

    public int statusUpdate(int id) throws Exception;

    public int flagUpdate(int id , int user_id) throws Exception;

    public RequestUserList getAnswerUser(int id) throws Exception;

    public RequestUser findRequestUser(RequestUserReqDto requestUserReqDto) throws Exception;

    public List<RequestUserList> loadRequestUser(int qnaBoardId) throws Exception;

    public int updateQnaStatus(Qna qna) throws Exception;
}
