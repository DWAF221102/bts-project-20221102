package com.btsproject.btsproject20221102.domain;

import com.btsproject.btsproject20221102.dto.board.RequestUserListRespDto;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@AllArgsConstructor
@NoArgsConstructor
@Builder
@Data
public class RequestUserList {
    private int id;
    private int qna_board_id;
    private int user_id;
    private String nickname;
    private double score_avg;
    private String skill;
    private String user_img;

    public RequestUserListRespDto requestUserListResp() {
        return RequestUserListRespDto.builder()
                .id(id)
                .qnaBoardId(qna_board_id)
                .userId(user_id)
                .nickName(nickname)
                .scoreAvg(score_avg)
                .skill(skill)
                .userImg(user_img)
                .build();
    }
}
