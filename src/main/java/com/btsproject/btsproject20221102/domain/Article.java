package com.btsproject.btsproject20221102.domain;

import com.btsproject.btsproject20221102.dto.board.ArticleRespDto;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;
import org.springframework.format.annotation.DateTimeFormat;

import java.time.LocalDateTime;
import java.time.format.DateTimeFormatter;
import java.util.List;

@Builder
@AllArgsConstructor
@NoArgsConstructor
@Data
public class Article {
    private String menu_name;
    private String category_name;
    private int user_id;
    private String user_img;
    private String nickname;
    @DateTimeFormat(pattern = "yyyy년MM월dd일HH시mm분ss초")
    private LocalDateTime create_date;
    private int view_count;
    private List<Like> like;
    private int id;
    private String title;
    private String content;
    private String subcategory_name;

    private List<Comment> comment;

    public ArticleRespDto toRespDto() {
        return ArticleRespDto.builder()
                .menuName(menu_name)
                .categoryName(category_name)
                .userId(user_id)
                .userImg(user_img)
                .nickname(nickname)
                .createDate(create_date)
                .viewCount(view_count)
                .like(like)
                .id(id)
                .title(title)
                .content(content)
                .subcategoryName(subcategory_name)
                .comment(comment)
                .build();
    }
}
