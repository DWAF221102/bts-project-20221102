package com.btsproject.btsproject20221102.dto.board;

import lombok.Builder;
import lombok.Data;

import java.time.LocalDateTime;

@Builder
@Data
public class BoardRespDto {
    private String nickname;
    private String userImg;

    private String title;
    private int viewCount;
    private String createDate;


    private String categoryName;
    private String subcategoryName;

    private int commentCount;
    private int recommentCount;
    private int likeCount;

    private int totalCount;
}
