package com.btsproject.btsproject20221102.dto.account;

import com.btsproject.btsproject20221102.domain.PointCharge;
import lombok.Builder;
import lombok.Data;

@Data
@Builder
public class PointChargeDto {
//    int id;
    int userId;
//    int type;
    int point;

    public PointCharge toPointCharge(){
        return PointCharge.builder()
//                .id(id)
                .user_id(userId)
//                .type(type)   // 1번이면 충전, else 포인트 사용
                .point(point)
                .build();
    }
}
