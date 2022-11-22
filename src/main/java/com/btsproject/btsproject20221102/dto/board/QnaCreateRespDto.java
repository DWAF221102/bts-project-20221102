package com.btsproject.btsproject20221102.dto.board;

import com.btsproject.btsproject20221102.domain.QnaImgFile;
import lombok.Builder;
import lombok.Data;

import java.time.LocalDateTime;
import java.util.List;

@Builder
@Data
public class QnaCreateRespDto {
    private int id;
    private int menuId;
    private int categoryId;
    private int categorySubId;
    private int statusId;
    private int userId;
    private String title;
    private String info;
    private String wantInfo;
    private int price;


//    private List<QnaImgFile> qna_img_files;

    private LocalDateTime create_date;
    private LocalDateTime update_date;

//    public QnaCreateRespDto toArticleRespDto() {
//        return QnaCreateRespDto.builder()
//                .id(id)
//                .menuId(menu_id)
//                .userId(user_id)
//                .subcategory(category_sub_id)
//                .title(title)
//                .statusId(status_id)
//                .build();
//    }
}
