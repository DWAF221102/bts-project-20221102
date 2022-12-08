package com.btsproject.btsproject20221102.dto.board;

import lombok.Builder;
import lombok.Data;

import java.util.List;

@Builder
@Data
public class UpdateCancelReqDto {
    private int id;
    private List<String> tempName;
    private List<String> oldImg;
}
