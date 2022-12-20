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


    private int id;
    private String menu_name;
    private String title;
    private LocalDateTime create_date;

    public RecentBoardListRespDto toRecentBoardListRespDto() {
    return RecentBoardListRespDto.builder()
            .userId(user_id)
            .nickname(nickname)
            .boardId(id)
            .menuName(menu_name)
            .title(title)
            .createDate(create_date.format(DateTimeFormatter.ofPattern("yyyy-MM-dd HH:mm:ss")))
            .build();

    }
}
