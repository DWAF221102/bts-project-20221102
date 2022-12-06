package com.btsproject.btsproject20221102.dto.account;

import lombok.Builder;
import lombok.Data;

@Data
@Builder
public class MyprofileQnaRespDto {
    private int userId;
    private int id;
    private String title;
    private String status;
    private String subcategoryName;
    private String createDate;
}
