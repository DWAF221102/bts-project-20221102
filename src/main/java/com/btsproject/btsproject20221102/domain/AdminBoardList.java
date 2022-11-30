package com.btsproject.btsproject20221102.domain;

import com.btsproject.btsproject20221102.dto.admin.AdminBoardListRespDto;
import com.btsproject.btsproject20221102.dto.admin.AdminUserListRespDto;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;


@Builder
@Data
@NoArgsConstructor
@AllArgsConstructor
public class AdminBoardList {

    private int user_id;
    private String nickname;

    private int id;
    private String title;
    private String category_name;
    private String subcategory_name;

    public AdminBoardListRespDto toAdminBoardListRespDto() {
        return AdminBoardListRespDto.builder()
                .userId(user_id)
                .nickname(nickname)
                .id(id)
                .title(title)
                .categoryName(category_name)
                .subcategoryName(subcategory_name)
                .build();
    }

}
