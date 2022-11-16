package com.btsproject.btsproject20221102.dto.board;

import com.btsproject.btsproject20221102.domain.Qna;
import lombok.Data;
import org.springframework.web.multipart.MultipartFile;

import java.util.List;

@Data
public class QnaCreateReqDto {
    private int category;
    private String subcategory;
    private String title;
    private String info;
    private String wantInfo;
    private int price;

    private List<MultipartFile> files;

    public Qna toQnaEntity() {
        return Qna.builder()
                .category(category)
                .title(title)
                .info(info)
                .want_info(wantInfo)
                .price(price)
                .build();
    }
}
