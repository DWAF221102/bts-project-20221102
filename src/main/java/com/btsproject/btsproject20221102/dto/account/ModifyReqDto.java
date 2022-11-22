package com.btsproject.btsproject20221102.dto.account;

import com.btsproject.btsproject20221102.domain.User;
import lombok.Data;

import javax.validation.constraints.NotBlank;
import javax.validation.constraints.Pattern;

@Data
public class ModifyReqDto {
    private  int id;
    @Pattern(regexp = "^[가-힇]{2,5}$",
            message = "한글로 2자 이상 5자 이하로 입력가능합니다")
    @NotBlank(message = "이름은 필수 입력값입니다.")
    private String name;
    @Pattern(regexp = "^(?=.*[a-zA-Z0-9가-힣])[a-zA-Z0-9가-힣]{2,16}$", message = "2자 이상 16자 이하, 영어 또는 숫자 또는 한글로 구성해야합니다.")
    @NotBlank(message = "닉네임은 필수 입력값입니다.")
    private String nickname;
    @Pattern(regexp="^010-?([0-9]{4})-?([0-9]{4})$", message = "휴대폰번호를 제대로 입력해주세요.")
    @NotBlank(message = "전화번호는 필수 입력값입니다.")
    private String phone;

    private String skill;

    public User toModifyEntity(){
        return User.builder()
                .id(id)
                .name(name)
                .nickname(nickname)
                .phone(phone)
                .skill(skill)
                .build();
    }
}
