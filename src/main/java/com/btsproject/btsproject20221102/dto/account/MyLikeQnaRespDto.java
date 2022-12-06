package com.btsproject.btsproject20221102.dto.account;

import lombok.Builder;
import lombok.Data;

@Data
@Builder
public class MyLikeQnaRespDto {
    private int userId;
    private int qnaBoardId;
    private String title;
    private String subcategoryName;
    private String status;
    private String createDate;
}
