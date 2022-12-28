package com.btsproject.btsproject20221102.dto.account;

import lombok.Builder;
import lombok.Data;

@Data
@Builder
public class PointChargeDto {
    int id;
    int point_id;
    int type;
    int point;

}
