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
    @Pattern(regexp = "^[a-zA-Z0-9]")
    private String password;

    public User toUserEntity(){
        return  User.builder()
                .username(username)
                .password(password)
                .build();

    }
    //정규 표현식
}
