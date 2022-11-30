package com.btsproject.btsproject20221102.dto.board;

import lombok.Builder;
import lombok.Data;

@Data
@Builder
public class QnaBoardRespDto {
    private int userId;
    private String nickname;
    private String userImg;

    private int boardId;
    private String title;
    private int price;
    private int statusId;
    private int viewCount;
    private String createDate;


    private String categoryName;
    private String subcategoryName;

    private int commentCount;
    private int recommentCount;
    private int likeCount;

    private int totalCount;

}
