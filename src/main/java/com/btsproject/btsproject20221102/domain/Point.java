package com.btsproject.btsproject20221102.domain;

import com.btsproject.btsproject20221102.dto.account.PointDto;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class Point {
    //포인트 조회
    private int id;
    private int user_id;
    private int total_point;
    private String create_date;

    public PointDto pointDto(){
        return PointDto.builder()
                .id(id)
                .userId(user_id)
                .totalPoint(total_point)
                .createDate(create_date)
                .build();
    }
}
