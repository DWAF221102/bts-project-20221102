package com.btsproject.btsproject20221102.dto.index;

import lombok.Builder;
import lombok.Data;

@Builder
@Data
public class AsideRankUserListRespDto {

    private int id;
    private String nickname;
    private String userImg;

    private double scoreAvg;
}
