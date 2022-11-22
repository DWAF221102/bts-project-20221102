package com.btsproject.btsproject20221102.domain;


import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@Builder
@AllArgsConstructor
@NoArgsConstructor
@Data
public class Like {
    private int like;
    private int board_id;
    private int from_id;
}
