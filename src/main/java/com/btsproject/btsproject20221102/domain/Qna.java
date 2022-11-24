package com.btsproject.btsproject20221102.domain;

import com.btsproject.btsproject20221102.dto.board.QnaCreateRespDto;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;
import org.springframework.web.multipart.MultipartFile;

import java.time.LocalDateTime;
import java.util.List;

@Builder
@NoArgsConstructor
@AllArgsConstructor
@Data
public class Qna {
    private int id;
    private int menu_id;
    private int category_id;
    private int category_sub_id;
    private int status_id;
    private String user_id;
    private String title;
    private String info;
    private String want_info;
    private int price;

    private List<QnaImgFile> qna_img_files;

    private LocalDateTime create_date;
    private LocalDateTime update_date;

//    public QnaCreateRespDto toArticleRespDto() {
//        return QnaCreateRespDto.builder()
//                .userId(user_id)
//                .subcategory(category_sub_id)
//                .title(title)
//                .statusId(status_id)
//                .build();
//    }

}
