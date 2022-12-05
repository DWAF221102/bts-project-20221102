package com.btsproject.btsproject20221102.domain;

import com.btsproject.btsproject20221102.dto.board.UpdateArticleRespDto;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@NoArgsConstructor
@AllArgsConstructor
@Data
public class UpdateArticle {
    int id;
    int category_id;
    int subcategory_id;
    String title;
    String content;

    public UpdateArticleRespDto toDto() {
        return UpdateArticleRespDto.builder()
                .id(id)
                .categoryId(category_id)
                .subcategoryId(subcategory_id)
                .title(title)
                .content(content)
                .build();
    }
}
