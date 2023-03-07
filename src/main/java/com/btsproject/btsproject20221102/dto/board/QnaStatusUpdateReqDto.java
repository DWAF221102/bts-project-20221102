package com.btsproject.btsproject20221102.dto.board;

import com.btsproject.btsproject20221102.domain.Qna;
import lombok.Data;

@Data
public class QnaStatusUpdateReqDto {

    private int boardId;
    private int statusId;

    public Qna toStatusUpdate() {
        return Qna.builder()
                .id(boardId)
                .status_id(statusId)
                .build();
    }
}
