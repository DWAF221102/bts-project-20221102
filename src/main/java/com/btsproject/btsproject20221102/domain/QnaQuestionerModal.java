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
public class QnaQuestionerModal {
    private int id;
    private int board_id;
    private int questioner_id;
    private int answerer_id;
    private float score;
    private LocalDateTime create_date;
    private LocalDateTime update_date;
}
