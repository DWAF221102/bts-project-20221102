package com.btsproject.btsproject20221102.dto.account;

import lombok.Builder;
import lombok.Data;

import java.time.LocalDateTime;

@Data
@Builder
public class MyLikeBoardRespDto {
    private int userId;
    private int boardId;
    private String title;
    private String subcategoryName;
    private String createDate;
}
