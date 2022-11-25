package com.btsproject.btsproject20221102.dto.index;

import lombok.Builder;
import lombok.Data;

@Builder
@Data
public class IndexBoardListRespDto {
    private int userId;
    private String nickname;
    private String userImg;

    private int boardId;
    private String title;
    private String createDate;

    private int commentCount;
    private int recommentCount;
    private int likeCount;
}
