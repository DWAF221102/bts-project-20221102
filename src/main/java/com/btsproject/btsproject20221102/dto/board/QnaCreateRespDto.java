package com.btsproject.btsproject20221102.dto.board;

import com.btsproject.btsproject20221102.domain.QnaArticle;
import com.btsproject.btsproject20221102.domain.QnaImgFile;
import lombok.Builder;
import lombok.Data;

import java.time.LocalDateTime;
import java.util.List;

@Builder
@Data
public class QnaCreateRespDto {
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
    private String causerAnalysis;
    private String solutionPlan;
    private int price;
    private String userImg;
    private int likeCount;
    private int viewCount;
//    private String originName;


    private List<QnaImgFile> qnaImgFiles;


    private String createDate;
    private LocalDateTime updateDate;


}
