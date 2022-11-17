package com.btsproject.btsproject20221102.dto.board;

import lombok.Builder;
import lombok.Data;

@Builder
@Data
public class WriteRespDto {
    private int menuId;
    private int categoryId;
    private int subcategoryId;

    private int userId;
    private String title;
    private String content;

}
