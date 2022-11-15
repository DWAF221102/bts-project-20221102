package com.btsproject.btsproject20221102.dto.board;

import lombok.Data;
import org.springframework.web.multipart.MultipartFile;

import java.io.File;
import java.util.List;

@Data
public class WriteReqDto {
    private int userId;

    private String menu;
    private String category;
    private String subcategory;

    private String title;
    private String content;
    private List<MultipartFile> file;
}
