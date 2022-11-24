package com.btsproject.btsproject20221102.domain;

import com.btsproject.btsproject20221102.dto.board.BoardRespDto;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import org.springframework.web.bind.annotation.RequestMapping;

import java.time.LocalDateTime;
import java.time.format.DateTimeFormatter;

@Builder
@AllArgsConstructor
@RequestMapping
@Data
public class LoadList {

    private int user_id;
    private String nickname;
    private String user_img;


    private int id;
    private String title;
    private int view_count;
    private LocalDateTime create_date;


    private String category_name;
    private String subcategory_name;

    private int comment_count;
    private int recomment_count;
    private int like_count;
    private int total_count;



    public BoardRespDto toBoardRespDto() {
        return BoardRespDto.builder()
                .userId(user_id)
                .nickname(nickname)
                .userImg(user_img)
                .boardId(id)
                .title(title)
                .viewCount(view_count)
                .createDate(create_date.format(DateTimeFormatter.ofPattern("yyyy년MM월dd일HH시mm분ss초")))
                .categoryName(category_name)
                .subcategoryName(subcategory_name)
                .commentCount(comment_count)
                .recommentCount(recomment_count)
                .likeCount(like_count)
                .totalCount(total_count)
                .build();
    }
}
