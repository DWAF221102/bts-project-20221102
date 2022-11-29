package com.btsproject.btsproject20221102.dto.board;

import com.btsproject.btsproject20221102.domain.Comment;
import com.btsproject.btsproject20221102.domain.Like;
import lombok.Builder;
import lombok.Data;
import org.springframework.format.annotation.DateTimeFormat;

import java.time.LocalDateTime;
import java.util.List;

@Builder
@Data
public class ArticleRespDto {
    private String menuName;
    private String categoryName;
    private int userId;
    private String userImg;
    private String nickname;
    @DateTimeFormat(pattern = "yyyy년MM월dd일HH시mm분ss초")
    private LocalDateTime createDate;
    private int viewCount;
    private List<Like> like;
    private int id;
    private String title;
    private String content;
    private String subcategoryName;

    private List<Comment> comment;
}
