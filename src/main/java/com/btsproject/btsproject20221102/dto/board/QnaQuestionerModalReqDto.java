package com.btsproject.btsproject20221102.dto.board;

import com.btsproject.btsproject20221102.domain.QnaAnswererModal;
import com.btsproject.btsproject20221102.domain.QnaQuestionerModal;
import lombok.Data;

@Data
public class QnaQuestionerModalReqDto {
    private int boardId;

    private float score;

    public QnaQuestionerModal toQuestionerModal(){
        return QnaQuestionerModal.builder()
                .board_id(boardId)
                .score(score)
                .build();


    }
}
