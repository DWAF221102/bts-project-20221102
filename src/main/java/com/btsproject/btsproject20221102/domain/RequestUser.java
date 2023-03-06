package com.btsproject.btsproject20221102.domain;

import com.btsproject.btsproject20221102.dto.board.RequestUserReqDto;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.time.LocalDateTime;

@Data
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class RequestUser extends RequestUserReqDto {
    private int id;
    private int qna_board_id;
    private int user_id;
    private int flag_id;

    private LocalDateTime create_date;
    private LocalDateTime update_date;
}
