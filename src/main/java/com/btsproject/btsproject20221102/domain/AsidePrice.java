package com.btsproject.btsproject20221102.domain;

import com.btsproject.btsproject20221102.dto.index.AsidePriceListRespDto;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import org.springframework.web.bind.annotation.RequestMapping;

import java.time.LocalDateTime;


@Builder
@AllArgsConstructor
@RequestMapping
@Data
public class AsidePrice {


    private int user_id;
    private String nickname;
    private String user_img;

    private int id;
    private int price;


    public AsidePriceListRespDto toAsidePriceRespDto() {
        return AsidePriceListRespDto.builder()
                .userId(user_id)
                .nickname(nickname)
                .userImg(user_img)
                .boardId(id)
                .price(price)
                .build();
    }
}
