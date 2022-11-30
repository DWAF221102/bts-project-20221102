package com.btsproject.btsproject20221102.domain;

import com.btsproject.btsproject20221102.dto.admin.AdminUserListRespDto;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@Builder
@Data
@NoArgsConstructor
@AllArgsConstructor
public class AdminUserList {

    private int id;
    private String username;
    private String name;
    private String nickname;
    private String phone;
    private String role_name;


    public AdminUserListRespDto toAdminUserListRespDto() {
        return AdminUserListRespDto.builder()
                .id(id)
                .username(username)
                .name(name)
                .nickname(nickname)
                .phone(phone)
                .roleName(role_name)
                .build();
    }
}
