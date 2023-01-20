package com.btsproject.btsproject20221102.dto.board;

import com.btsproject.btsproject20221102.domain.QnaAnswererModal;
import lombok.Data;

@Data
public class QnaAnswerModalReqDto {
    private int id;
    private String causerAnalysis;   // 원인 분석
    private String solutionPlan;     // 해결 방안

    public QnaAnswererModal toAnswererModal(){
        return QnaAnswererModal.builder()
                .id(id)
                .causer_analysis(causerAnalysis)
                .solution_plan(solutionPlan)
                .build();
    }
}
