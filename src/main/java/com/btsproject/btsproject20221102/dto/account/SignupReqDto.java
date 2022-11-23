package com.btsproject.btsproject20221102.dto.account;

import com.btsproject.btsproject20221102.domain.User;
import lombok.Data;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;

import javax.validation.constraints.Email;
import javax.validation.constraints.NotBlank;
import javax.validation.constraints.Pattern;

@Data
public class SignupReqDto {

    @NotBlank(message = "아이디를 입력해주세요.")
    @Email
    private String username;

    @Pattern(regexp = "^(?=.*[a-zA-Z])(?=.*\\d)(?=.*[~!@#$%^&*_])[a-zA-Z\\d-~!@#$%^&*_]{8,16}$",
            message = "숫자, 영문, 특수기호를 하나 이상 포함하여 8자 이상 16자 이하로 작성해야합니다.")
    private String password;

    @Pattern(regexp = "^[가-힇]{2,5}$",
            message = "한글로 2자 이상 5자 이하로 입력가능합니다")
    private String name;

    @Pattern(regexp="^010-?([0-9]{4})-?([0-9]{4})$", message = "휴대폰번호를 제대로 입력해주세요.")
    private String phone;

    @Pattern(regexp = "^(?=.*[a-zA-Z0-9가-힣])[a-zA-Z0-9가-힣]{2,16}$", message = "2자 이상 16자 이하, 영어 또는 숫자 또는 한글로 구성해야합니다.")
    private String nickName;

    public User toUserEntity() {
        return User.builder()
                .role_id(1)
                .username(username)
                .password(new BCryptPasswordEncoder().encode(password))
                .name(name)
                .phone(phone)
                .nickname(nickName)
                .enabled(0)
                .user_img("base-profile-img.png")
                .build();
    }
}
