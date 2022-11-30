package com.btsproject.btsproject20221102.dto.admin;

import lombok.Builder;
import lombok.Data;

@Data
@Builder
public class AdminQnAListRespDto {

    private int userId;
    private String nickname;

    private int id;
    private String title;
    private String status;

    private String categoryName;
    private String subcategoryName;
}
