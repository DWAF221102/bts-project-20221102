package com.btsproject.btsproject20221102.domain;

import com.btsproject.btsproject20221102.aop.annotation.LogAspect;
import com.btsproject.btsproject20221102.dto.board.QnaCreateRespDto;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;
import lombok.extern.slf4j.Slf4j;

import java.time.LocalDateTime;
import java.util.List;

@Builder
@Data
@NoArgsConstructor
@AllArgsConstructor
public class QnaArticle {
    private int id;
    private int menu_id;

    private String category_name;

    private String subcategory_name;

    private String status;

    private String nickname;
    private String title;
    private String info;
    private String want_info;
    private int price;

    private List<QnaImgFile> qna_img_files;



    private LocalDateTime create_date;
    private LocalDateTime update_date;


    public QnaCreateRespDto toQnaCreateRespDto() {
        return QnaCreateRespDto.builder()
                .id(id)
                .menuId(menu_id)
                .categoryName(category_name)
                .subcategoryName(subcategory_name)
                .status(status)
                .nickname(nickname)
                .title(title)
                .info(info)
                .wantInfo(want_info)
                .price(price)
                .qnaImgFiles(qna_img_files)
                .create_date(create_date)
                .update_date(update_date)
                .build();
    }

}
