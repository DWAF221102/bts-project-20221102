package com.btsproject.btsproject20221102.dto.account;

import lombok.Builder;
import lombok.Data;

@Data
@Builder
public class PointDto {
    int id;
    int userId;
    int totalPoint;
    String createDate;
}
