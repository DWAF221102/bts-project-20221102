package com.btsproject.btsproject20221102.dto.account;

import com.btsproject.btsproject20221102.domain.User;
import lombok.Data;

import javax.validation.constraints.Email;
import javax.validation.constraints.NotBlank;
import javax.validation.constraints.Pattern;

@Data
public class LoginReqDto {
    @NotBlank(message = "아이디를 입력해주세요.")
    @Email
    private String username;
    @NotBlank(message = "비밀번호를 입력해주세요.")
    private String password;

    public User toUserEntity(){
        return  User.builder()
                .username(username)
                .password(password)
                .build();

    }

}
