package com.btsproject.btsproject20221102.dto.index;

import lombok.Builder;
import lombok.Data;


@Builder
@Data
public class AsidePriceListRespDto {
    private int userId;
    private String nickname;
    private String userImg;

    private int boardId;
    private int price;

}
