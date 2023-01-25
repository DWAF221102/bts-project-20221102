package com.btsproject.btsproject20221102.domain;

import com.btsproject.btsproject20221102.aop.annotation.LogAspect;
import com.btsproject.btsproject20221102.dto.board.QnaCreateRespDto;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;
import lombok.extern.slf4j.Slf4j;

import java.time.LocalDateTime;
import java.time.format.DateTimeFormatter;
import java.util.List;

@Builder
@Data
@NoArgsConstructor
@AllArgsConstructor
public class QnaArticle {
    private int id;
    private int user_id;
    private int menu_id;

    private String category_name;

    private String subcategory_name;

    private String status;

    private String nickname;
    private String title;
    private String info;
    private String want_info;

    private String causer_analysis;

    private String solution_plan;
    private int price;
    private String user_img;
    private int like_count;
    private int view_count;

    private List<QnaImgFile> qna_img_files;






    private LocalDateTime create_date;
    private LocalDateTime update_date;


    public QnaCreateRespDto toQnaCreateRespDto() {
        return QnaCreateRespDto.builder()
                .id(id)
                .userId(user_id)
                .menuId(menu_id)
                .categoryName(category_name)
                .subcategoryName(subcategory_name)
                .status(status)
                .nickname(nickname)
                .title(title)
                .info(info)
                .wantInfo(want_info)
                .causerAnalysis(causer_analysis)
                .solutionPlan(solution_plan)
                .price(price)
                .userImg(user_img)
                .likeCount(like_count)
                .viewCount(view_count)
                .qnaImgFiles(qna_img_files)
                .createDate(create_date.format(DateTimeFormatter.ofPattern("yyyy년MM월dd일HH시mm분ss초")))
                .updateDate(update_date)
                .build();
    }

}
