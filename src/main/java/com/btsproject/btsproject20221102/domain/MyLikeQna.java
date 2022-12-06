package com.btsproject.btsproject20221102.domain;

import com.btsproject.btsproject20221102.dto.account.MyLikeBoardRespDto;
import com.btsproject.btsproject20221102.dto.account.MyLikeQnaRespDto;
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
public class MyLikeQna {
    private int from_id;
    private int qna_board_id;
    private String title;
    private String subcategory_name;
    private String status;
    private LocalDateTime create_date;

    public MyLikeQnaRespDto toMypLikeQnaRespDto() {
        return MyLikeQnaRespDto.builder()
                .userId(from_id)
                .qnaBoardId(qna_board_id)
                .title(title)
                .subcategoryName(subcategory_name)
                .status(status)
                .createDate(create_date.format(DateTimeFormatter.ofPattern("yyyy년MM월dd일HH시mm분ss초")))
                .build();
    }
}
