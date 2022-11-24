package com.btsproject.btsproject20221102.domain;

import com.btsproject.btsproject20221102.aop.annotation.LogAspect;
import com.btsproject.btsproject20221102.dto.board.QnaCreateRespDto;
import lombok.Builder;
import lombok.Data;
import lombok.extern.slf4j.Slf4j;

import java.time.LocalDateTime;
@Builder
@Data
@LogAspect
@Slf4j
public class QnaArticle {
    private int id;
    private int menu_id;
    private int category_id;
    private int category_sub_id;
    private int status_id;
    private int user_id;
    private String title;
    private String info;
    private String want_info;
    private int price;



    private LocalDateTime create_date;
    private LocalDateTime update_date;


    public QnaCreateRespDto toQnaCreateRespDto() {
        return QnaCreateRespDto.builder()
                .id(id)
                .menuId(menu_id)
                .categoryId(category_id)
                .categorySubId(category_sub_id)
                .statusId(status_id)
                .userId(user_id)
                .title(title)
                .info(info)
                .wantInfo(want_info)
                .price(price)
                .create_date(create_date)
                .update_date(update_date)
                .build();
    }

}
