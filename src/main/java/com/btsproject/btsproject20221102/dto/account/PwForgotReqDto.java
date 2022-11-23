package com.btsproject.btsproject20221102.dto.account;

import com.btsproject.btsproject20221102.domain.Key;
import lombok.Builder;
import lombok.Data;

import javax.validation.constraints.NotBlank;
import javax.validation.constraints.Pattern;

@Data
@Builder
public class PwForgotReqDto {
    private int id;
    @NotBlank
    private String accessKey;

    @Pattern(regexp = "^(?=.*[a-zA-Z])(?=.*\\d)(?=.*[~!@#$%^&*_])[a-zA-Z\\d-~!@#$%^&*_]{8,16}$",
            message = "숫자, 영문, 특수기호를 하나 이상 포함하여 8자 이상 16자 이하로 작성해야합니다.")
    private String newPw;

    private String checkNewPw;

    public Key toKeyEntity() {
        return Key.builder()
                .user_id(id)
                .enabled_key(accessKey)
                .build();
    }
}
