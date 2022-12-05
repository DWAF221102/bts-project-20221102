package com.btsproject.btsproject20221102.dto.board;

import lombok.Builder;
import lombok.Data;

import java.util.List;

@Builder
@Data
public class UpdateReqDto {
    private int id;
    private String category;
    private String subcategory;

    private String title;
    private String content;
    private List<String> originFile;
    private List<String> tempFile;
}
