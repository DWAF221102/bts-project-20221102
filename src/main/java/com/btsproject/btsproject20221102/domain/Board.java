package com.btsproject.btsproject20221102.domain;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@AllArgsConstructor
@NoArgsConstructor
@Data
public class Board {
    private int boardId;

    private int menuId;
    private int categoryId;
    private int subcategoryId;

    private int userId;
    private String title;
    private String content;
    private int viewCount;
}
