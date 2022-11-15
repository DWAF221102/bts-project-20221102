package com.btsproject.btsproject20221102.dto.account;

import com.btsproject.btsproject20221102.domain.User;
import lombok.Data;

@Data
public class SignupReqDto {

    private String username;
    private String password;
    private String name;
    private String phone;
    private String nickName;

    public User toUserEntity() {
        return User.builder()
                .username(username)
                .password(password)
                .name(name)
                .phone(phone)
                .nickname(nickName)
                .role_id(1)
                .build();
    }
}
