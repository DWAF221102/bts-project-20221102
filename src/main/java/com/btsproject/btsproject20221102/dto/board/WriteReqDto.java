package com.btsproject.btsproject20221102.dto.board;

import lombok.Data;

@Data
public class WriteReqDto {
    private int menuId;
    private int categoryId;
    private int subcategoryId;

    private int userId;
    private String title;
    private String content;
}
