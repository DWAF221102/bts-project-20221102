package com.btsproject.btsproject20221102.domain;

import com.btsproject.btsproject20221102.dto.admin.AdminQnAListRespDto;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@Builder
@Data
@NoArgsConstructor
@AllArgsConstructor
public class AdminQnAList {

    private int user_id;
    private String nickname;

    private int id;
    private String title;
    private String status;

    private String category_name;
    private String subcategory_name;

    public AdminQnAListRespDto toAdminQnAListRespDto() {
        return AdminQnAListRespDto.builder()
                .userId(user_id)
                .nickname(nickname)
                .id(id)
                .title(title)
                .status(status)
                .categoryName(category_name)
                .subcategoryName(subcategory_name)
                .build();
    }
}
