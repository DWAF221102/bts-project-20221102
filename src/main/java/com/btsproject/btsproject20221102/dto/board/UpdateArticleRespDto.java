package com.btsproject.btsproject20221102.dto.board;

import lombok.Builder;
import lombok.Data;

@Builder
@Data
public class UpdateArticleRespDto {
    int id;
    int categoryId;
    int subcategoryId;
    String title;
    String content;
}
