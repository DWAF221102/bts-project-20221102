package com.btsproject.btsproject20221102.domain;

import com.btsproject.btsproject20221102.dto.account.MyLikeBoardRespDto;
import com.btsproject.btsproject20221102.dto.account.MyprofileQnaRespDto;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.time.LocalDateTime;
import java.time.format.DateTimeFormatter;

@Data
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class MyLikeBoard {
    private int from_id;
    private int board_id;
    private String title;
    private String subcategory_name;
    private LocalDateTime create_date;

    public MyLikeBoardRespDto toMyLikeBoardRespDto() {
        return MyLikeBoardRespDto.builder()
                .userId(from_id)
                .boardId(board_id)
                .title(title)
                .subcategoryName(subcategory_name)
                .createDate(create_date.format(DateTimeFormatter.ofPattern("yyyy년MM월dd일HH시mm분ss초")))
                .build();
    }
}
