package com.btsproject.btsproject20221102.domain;


import com.btsproject.btsproject20221102.dto.index.IndexBoardListRespDto;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;
import org.springframework.web.bind.annotation.RequestMapping;

import java.time.LocalDateTime;
import java.time.format.DateTimeFormatter;

@Builder
@AllArgsConstructor
@NoArgsConstructor
@Data
public class IndexLoadList {

    private int user_id;
    private String nickname;
    private String user_img;

    private int id;
    private String title;
    private LocalDateTime create_date;

    private int comment_count;
    private int recomment_count;
    private int like_count;

    public IndexBoardListRespDto toIndexBoardRespDto() {
        return IndexBoardListRespDto.builder()
                .userId(user_id)
                .nickname(nickname)
                .userImg(user_img)
                .boardId(id)
                .title(title)
                .createDate(create_date.format(DateTimeFormatter.ofPattern("yyyy년MM월dd일HH시mm분ss초")))
                .commentCount(comment_count)
                .recommentCount(recomment_count)
                .likeCount(like_count)
                .build();
    }
}
