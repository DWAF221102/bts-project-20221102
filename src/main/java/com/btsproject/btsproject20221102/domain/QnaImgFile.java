package com.btsproject.btsproject20221102.domain;

import com.btsproject.btsproject20221102.dto.board.QnaImgDto;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.time.LocalDateTime;

@Builder
@NoArgsConstructor
@AllArgsConstructor
@Data
public class QnaImgFile {
    private int id;
    private int qna_board_id;
    private String origin_name;
    private String temp_name;

    private LocalDateTime create_date;
    private LocalDateTime update_date;

//    public QnaImgDto qnaImgDto() {
//        return QnaImgDto.builder()
//                .id(id)
//                .qnaBoardId(qna_board_id)
//                .originName(origin_name)
//                .tempName(temp_name)
//                .create_date(create_date)
//                .update_date(update_date)
//                .build();
//
//    }




}
