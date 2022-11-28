package com.btsproject.btsproject20221102.dto.index;

import lombok.Builder;
import lombok.Data;

import java.time.LocalDateTime;

@Builder
@Data
public class IndexQnAListRespDto {
    private int userId;
    private String nickname;
    private String userImg;

    private int boardId;
    private String title;
    private int price;
    private String createDate;

    private int likeCount;
}
