package com.btsproject.btsproject20221102.domain;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.time.LocalDateTime;

@Builder
@NoArgsConstructor
@AllArgsConstructor
@Data
public class QnaUpdateImgFile {
    private int id;
    private int qna_board_id;
    private String origin_name;
    private String temp_name;

    private LocalDateTime create_date;
    private LocalDateTime update_date;
}
