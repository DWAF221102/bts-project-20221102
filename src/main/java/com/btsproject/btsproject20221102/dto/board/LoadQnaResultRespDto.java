package com.btsproject.btsproject20221102.dto.board;

import lombok.Builder;
import lombok.Data;

@Builder
@Data
public class LoadQnaResultRespDto {
    private int id;
    private String causerAnalysis;
    private String solutionPlan;
}
