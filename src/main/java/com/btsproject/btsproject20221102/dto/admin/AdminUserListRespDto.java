package com.btsproject.btsproject20221102.dto.admin;

import com.btsproject.btsproject20221102.domain.Role;
import lombok.Builder;
import lombok.Data;

@Builder
@Data
public class AdminUserListRespDto {

    private int id;
    private String username;
    private String name;
    private String nickname;
    private String phone;
    private String roleName;

}
