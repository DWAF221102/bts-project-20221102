package com.btsproject.btsproject20221102.dto.board;

import lombok.Builder;
import lombok.Data;

@Builder
@Data
public class WriteRespDto {
    private int menu_id;
    private int category_id;
    private int subcategory_d;

    private int user_id;
    private String title;
    private String content;
    private int view_count;

}
