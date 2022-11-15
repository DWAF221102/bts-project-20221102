package com.btsproject.btsproject20221102.dto.account;

import com.btsproject.btsproject20221102.domain.User;
import com.btsproject.btsproject20221102.dto.Validation.ValidationGroups;
import lombok.Data;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;

import javax.validation.constraints.Email;
import javax.validation.constraints.NotBlank;
import javax.validation.constraints.Pattern;
import javax.validation.constraints.Size;

@Data
public class SignupReqDto {

    @Email
    @NotBlank(message = "아이디를 입력해주세요.", groups = ValidationGroups.NotBlankGroup.class)
    private String username;

    @NotBlank(message = "비밀번호를 입력해주세요.", groups = ValidationGroups.NotBlankGroup.class)
    @Size(min = 8, max = 16, message = "비밀번호는 8자 이상 16자 이하입니다.")
    @Pattern(regexp = "^(?=.*[a-zA-Z])(?=.*\\d)(?=.*[~!@#$%^&*_])[a-zA-Z\\d-~!@#$%^&*_]{8,16}$",
            message = "비밀번호는 숫자, 영문, 특수기호를 하나 이상 포함하여 작성해야합니다",
            groups = ValidationGroups.PatternCheckGroup.class)
    private String password;

    @NotBlank(message = "이름을 입력해주세요.", groups = ValidationGroups.NotBlankGroup.class)
    @Size(min = 1, max = 4, message="이름을 제대로 입력해주세요.", groups = ValidationGroups.SizeCheckGroup.class)
    @Pattern(regexp = "^[가-힇]*$",
            message = "이름은 한글만 입력가능합니다",
            groups = ValidationGroups.PatternCheckGroup.class)
    private String name;

    @NotBlank(message = "휴대폰을 입력해주세요.", groups = ValidationGroups.NotBlankGroup.class)
    @Pattern(regexp="^010-?([0-9]{4})-?([0-9]{4})$", message = "휴대폰번호를 제대로 입력해주세요.", groups = ValidationGroups.PatternCheckGroup.class)
    private String phone;

    @NotBlank(message = "닉네임을 입력해주세요.", groups = ValidationGroups.NotBlankGroup.class)
    @Pattern(regexp = "^(?=.*[a-z0-9가-힣])[a-z0-9가-힣]{2,16}$", message = "2자 이상 16자 이하, 영어 또는 숫자 또는 한글로 구성", groups = ValidationGroups.PatternCheckGroup.class)
    private String nickName;

    public User toUserEntity() {
        return User.builder()
                .role_id(1)
                .username(username)
                .password(new BCryptPasswordEncoder().encode(password))
                .name(name)
                .phone(phone)
                .nickname(nickName)
                .build();
    }
}
