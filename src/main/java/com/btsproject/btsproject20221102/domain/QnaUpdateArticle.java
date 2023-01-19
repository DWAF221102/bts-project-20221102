package com.btsproject.btsproject20221102.domain;

import com.btsproject.btsproject20221102.dto.board.QnaCreateRespDto;
import com.btsproject.btsproject20221102.dto.board.QnaUpdateRespDto;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.time.LocalDateTime;
import java.time.format.DateTimeFormatter;
import java.util.List;

@Builder
@Data
@NoArgsConstructor
@AllArgsConstructor
public class QnaUpdateArticle {
    private int id;
    private int user_id;
    private int menu_id;

    private String category_name;
    private int category_id;

    private String subcategory_name;
    private int category_sub_id;

    private String status;

    private String nickname;
    private String title;
    private String info;
    private String want_info;

    private int price;
    private String user_img;
    private int like_count;
    private int view_count;

    private List<QnaUpdateImgFile> qna_update_img_files;






    private LocalDateTime create_date;
    private LocalDateTime update_date;


    public QnaUpdateRespDto toQnaUpdateRespDto() {
        return QnaUpdateRespDto.builder()
                .id(id)
                .userId(user_id)
                .menuId(menu_id)
                .categoryName(category_name)
                .categoryId(category_id)
                .subcategoryName(subcategory_name)
                .categorySubId(category_sub_id)
                .status(status)
                .nickname(nickname)
                .title(title)
                .info(info)
                .wantInfo(want_info)
                .price(price)
                .userImg(user_img)
                .likeCount(like_count)
                .viewCount(view_count)
                .qnaImgFiles(qna_update_img_files)
                .createDate(create_date.format(DateTimeFormatter.ofPattern("yyyy년MM월dd일HH시mm분ss초")))
                .updateDate(update_date)
                .build();
    }
}
