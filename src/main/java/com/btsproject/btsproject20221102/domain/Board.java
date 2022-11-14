package com.btsproject.btsproject20221102.domain;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@AllArgsConstructor
@NoArgsConstructor
@Data
public class Board {
    private int board_id;

    private int menu_id;
    private int category_id;
    private int subcategory_id;

    private int user_id;
    private String title;
    private String content;
    private int view_count;
}
