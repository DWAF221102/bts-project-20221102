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
public class Recomment {
    private int id;
    private int comment_id;
    private int user_id;
    private String content;
    private LocalDateTime create_date;
    private LocalDateTime update_date;
}