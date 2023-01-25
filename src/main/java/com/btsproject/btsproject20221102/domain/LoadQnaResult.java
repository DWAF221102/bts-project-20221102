package com.btsproject.btsproject20221102.domain;

import com.btsproject.btsproject20221102.dto.board.LoadQnaResultRespDto;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@AllArgsConstructor
@NoArgsConstructor
@Builder
@Data
public class LoadQnaResult {
    private int id;
    private String causer_analysis;
    private String solution_plan;

    public LoadQnaResultRespDto toQnaResult(){
        return LoadQnaResultRespDto.builder()
                .id(id)
                .causerAnalysis(causer_analysis)
                .solutionPlan(solution_plan)
                .build();
    }


