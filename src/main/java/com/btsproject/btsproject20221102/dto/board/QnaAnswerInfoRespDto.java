package com.btsproject.btsproject20221102.dto.board;

import com.btsproject.btsproject20221102.domain.QnaAnswerInfo;
import lombok.Builder;
import lombok.Data;
@Builder
@Data
public class QnaAnswerInfoRespDto {
    private int id;
    private String nickname;
    private String userImg;

    }

