package com.btsproject.btsproject20221102.dto.board;

import lombok.Builder;

import java.time.LocalDateTime;

@Builder
public class QnaImgDto {
    private int id;
    private int qnaBoardId;
    private String originName;
    private String tempName;
    private LocalDateTime create_date;
    private LocalDateTime update_date;

}
