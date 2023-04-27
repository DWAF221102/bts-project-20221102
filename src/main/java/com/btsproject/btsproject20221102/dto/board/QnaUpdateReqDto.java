package com.btsproject.btsproject20221102.dto.board;

import com.btsproject.btsproject20221102.domain.Qna;
import lombok.Data;
import org.springframework.web.multipart.MultipartFile;

import java.util.List;

@Data
public class QnaUpdateReqDto {
    private int category;
    private int subcategory;
    private String title;
    private String info;
    private String wantInfo;
    private int price;

    private List<MultipartFile> files;

    private int userId;

    public Qna toQnaEntity() {
        return Qna.builder()
                .category_id(category)
                .category_sub_id(subcategory)
                .title(title)
                .info(info)
                .want_info(wantInfo)
                .price(price)
                .user_id(userId)
                .build();
    }

}
