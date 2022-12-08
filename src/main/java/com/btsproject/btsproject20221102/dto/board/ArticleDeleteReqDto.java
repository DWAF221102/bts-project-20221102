package com.btsproject.btsproject20221102.dto.board;

import lombok.Builder;
import lombok.Data;

import java.util.List;

@Builder
@Data
public class ArticleDeleteReqDto {
    private int id;
    private List<String> oldImg;
    private List<String> tempName;
}
