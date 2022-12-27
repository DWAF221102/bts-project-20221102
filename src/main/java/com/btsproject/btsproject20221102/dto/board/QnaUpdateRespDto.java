package com.btsproject.btsproject20221102.dto.board;

import com.btsproject.btsproject20221102.domain.QnaImgFile;
import com.btsproject.btsproject20221102.domain.QnaUpdateImgFile;
import lombok.Builder;
import lombok.Data;

import java.time.LocalDateTime;
import java.util.List;

@Builder
@Data
public class QnaUpdateRespDto {
    private int id;
    private int userId;
    private int menuId;
    private String categoryName;
    private String subcategoryName;
    private String status;
    private String nickname;
    private String title;
    private String info;
    private String wantInfo;
    private int price;
    private String userImg;
    private int likeCount;
    private int viewCount;
//    private String originName;


    private List<QnaUpdateImgFile> qnaImgFiles;


    private String createDate;
    private LocalDateTime updateDate;
}
