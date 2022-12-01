package com.btsproject.btsproject20221102.domain;

import com.btsproject.btsproject20221102.dto.index.AsidePriceListRespDto;
import com.btsproject.btsproject20221102.dto.index.AsideRankUserListRespDto;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@Builder
@Data
@AllArgsConstructor
@NoArgsConstructor
public class AsideRankUser {

    private int id;
    private String nickname;
    private String user_img;

    private double score_avg;

    public AsideRankUserListRespDto toAsideRankUserRespDto() {
        return AsideRankUserListRespDto.builder()
                .id(id)
                .nickname(nickname)
                .userImg(user_img)
                .scoreAvg(score_avg)
                .build();
    }

}
