package com.btsproject.btsproject20221102.dto.account;

import lombok.Builder;
import lombok.Data;

@Data
@Builder
public class PwSearchReqDto {
    private int id;
    private String accessKey;
}
