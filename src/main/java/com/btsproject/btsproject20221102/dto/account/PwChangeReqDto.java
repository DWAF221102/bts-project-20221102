package com.btsproject.btsproject20221102.dto.account;

import lombok.Data;

import javax.validation.constraints.NotBlank;
import javax.validation.constraints.Pattern;

@Data
public class PwChangeReqDto {
    @Pattern(regexp = "^(?=.*[a-zA-Z])(?=.*\\d)(?=.*[~!@#$%^&*_])[a-zA-Z\\d-~!@#$%^&*_]{8,16}$",
            message = "숫자, 영문, 특수기호를 하나 이상 포함하여 8자 이상 16자 이하로 작성해야합니다.")
    private String currentPw;
    @Pattern(regexp = "^(?=.*[a-zA-Z])(?=.*\\d)(?=.*[~!@#$%^&*_])[a-zA-Z\\d-~!@#$%^&*_]{8,16}$",
            message = "숫자, 영문, 특수기호를 하나 이상 포함하여 8자 이상 16자 이하로 작성해야합니다.")
    private String newPw;
    @Pattern(regexp = "^(?=.*[a-zA-Z])(?=.*\\d)(?=.*[~!@#$%^&*_])[a-zA-Z\\d-~!@#$%^&*_]{8,16}$",
            message = "숫자, 영문, 특수기호를 하나 이상 포함하여 8자 이상 16자 이하로 작성해야합니다.")
    private String checkNewPw;


}
