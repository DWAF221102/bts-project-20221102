package com.btsproject.btsproject20221102.dto.board;

import lombok.Builder;
import lombok.Data;
import org.springframework.lang.Nullable;
import org.springframework.web.multipart.MultipartFile;

import java.util.List;

@Builder
@Data
public class UpdateReqDto {
    private int id;
    private String category;
    private String subcategory;

    private String title;
    private String content;


    private List<String> img;
    private List<String> tempName;
    private List<MultipartFile> Files;
    private List<String> deleteImg;
}
