package com.btsproject.btsproject20221102.dto.board;

import com.btsproject.btsproject20221102.domain.QnaAnswererModal;
import com.btsproject.btsproject20221102.domain.QnaQuestionerModal;
import lombok.Data;

@Data
public class QnaQuestionerModalReqDto {
    private int boardId;

    // 질문자 아이디
    private int questionerId;
    // 답변자 아이디
    private int answererId;

    private float score;

    public QnaQuestionerModal toQuestionerModal(){
        return QnaQuestionerModal.builder()
                .board_id(boardId)
                .questioner_id(questionerId)
                .answerer_id(answererId)
                .score(score)
                .build();


    }
}
