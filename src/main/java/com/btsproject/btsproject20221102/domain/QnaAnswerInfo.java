package com.btsproject.btsproject20221102.domain;

import com.btsproject.btsproject20221102.dto.board.QnaAnswerInfoRespDto;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;


@Builder
@AllArgsConstructor
@NoArgsConstructor
@Data
public class QnaAnswerInfo {
    private int id;
    private String nickname;
    private String user_img;

    public QnaAnswerInfoRespDto toAnswerInfo(){
        return QnaAnswerInfoRespDto.builder()
                .id(id)
                .nickname(nickname)
                .userImg(user_img)
                .build();
    }
}
