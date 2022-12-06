package com.btsproject.btsproject20221102.dto.account;

import lombok.Builder;
import lombok.Data;

@Data
@Builder
public class MyprofileBoardRespDto {
    private int userId;
    private int id;
    private String title;
    private String subcategoryName;
    private String createDate;
}
