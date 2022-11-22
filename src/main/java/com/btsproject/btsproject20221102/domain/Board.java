package com.btsproject.btsproject20221102.domain;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.time.LocalDateTime;


@Builder
@AllArgsConstructor
@NoArgsConstructor
@Data
public class Board {
    private int id;

    private int menu_id;
    private int category_id;
    private int subcategory_id;
    private int user_id;

    private String title;
    private String content;
    private int view_count;

    private LocalDateTime create_date;
    private LocalDateTime update_date;
}
