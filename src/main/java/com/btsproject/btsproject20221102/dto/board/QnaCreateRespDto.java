package com.btsproject.btsproject20221102.dto.board;

import com.btsproject.btsproject20221102.domain.QnaImgFile;
import lombok.Builder;
import lombok.Data;

import java.time.LocalDateTime;
import java.util.List;

@Builder
@Data
public class QnaCreateRespDto {
    private String userId;
    private int subcategory;
    private String title;
    private int statusId;


    private List<QnaImgFile> qna_img_files;

    private LocalDateTime create_date;
    private LocalDateTime update_date;
}
