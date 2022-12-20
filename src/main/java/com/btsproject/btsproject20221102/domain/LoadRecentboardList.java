package com.btsproject.btsproject20221102.domain;

import com.btsproject.btsproject20221102.dto.account.RecentBoardListRespDto;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.time.LocalDateTime;
import java.time.format.DateTimeFormatter;


@AllArgsConstructor
@NoArgsConstructor
@Builder
@Data
public class LoadRecentboardList {
    private int user_id;
    private String nickname;
    private String user_img;

    private int id;
    private int subcategory_id;
    private String title;
    private LocalDateTime create_date;

    public RecentBoardListRespDto toRecentBoardListRespDto() {
    return RecentBoardListRespDto.builder()
            .userId(user_id)
            .nickname(nickname)
            .userImg(user_img)
            .boardId(id)
            .subcategoryId(subcategory_id)
            .title(title)
            .createDate(create_date.format(DateTimeFormatter.ofPattern("yyyy년MM월dd일HH시mm분ss초")))
            .build();

    }
}
