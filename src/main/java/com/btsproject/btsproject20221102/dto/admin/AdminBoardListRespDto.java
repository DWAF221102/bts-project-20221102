package com.btsproject.btsproject20221102.dto.admin;

import lombok.Builder;
import lombok.Data;

@Builder
@Data
public class AdminBoardListRespDto {

    private int userId;
    private String nickname;

    private int id;
    private String title;
    private String categoryName;
    private String subcategoryName;

}
