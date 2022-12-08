package com.btsproject.btsproject20221102.dto.board;

import com.btsproject.btsproject20221102.domain.Board;
import lombok.Data;
import org.springframework.web.multipart.MultipartFile;

import java.util.List;

@Data
public class WriteReqDto {
    private int userId;

    private String menu;
    private String category;
    private String subcategory;

    private String title;
    private String content;
    private List<String> img;
    private List<String> tempName;
    private  List<MultipartFile> files;


    public Board toBoardEntity() {
        return Board.builder()
                .menu_id(Integer.parseInt(menu))
                .category_id(Integer.parseInt(category))
                .subcategory_id(Integer.parseInt(subcategory))
                .user_id(userId)
                .title(title)
                .content(content)
                .build();
    }
}

