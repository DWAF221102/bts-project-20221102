package com.btsproject.btsproject20221102.domain;

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
    private int category;
    private String subcategory;
    private String title;
    private String info;
    private String want_info;
    private int price;

    private List<QnaImgFile> qna_img_files;

    private LocalDateTime create_date;
    private LocalDateTime update_date;

}
