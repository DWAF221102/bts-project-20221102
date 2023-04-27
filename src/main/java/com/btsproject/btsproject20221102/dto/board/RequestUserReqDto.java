package com.btsproject.btsproject20221102.dto.board;

import com.btsproject.btsproject20221102.domain.RequestUser;
import lombok.Data;

@Data
public class RequestUserReqDto {
    private int qnaBoardId;
    private int userId;

    public RequestUser toRequestUserEntity() {
        return RequestUser.builder()
                .qna_board_id(qnaBoardId)
                .user_id(userId)
                .build();
    }

//    public RequestUser toCheckRequestEntity() {
//        return RequestUser.builder()
//                .qna_board_id(qnaBoardId)
//                .user_id(userId)
//                .build();
//    }
}

