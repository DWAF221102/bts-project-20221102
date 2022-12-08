package com.btsproject.btsproject20221102.domain;

import lombok.Builder;
import lombok.Data;

import java.time.LocalDateTime;
import java.util.List;

@Builder
@Data
public class LoadRecent {
    private int id;

    private List<RecentBoard> board;

    private List<RecentQna> qna;




}
