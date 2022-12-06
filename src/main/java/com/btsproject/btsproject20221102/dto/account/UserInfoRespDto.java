package com.btsproject.btsproject20221102.dto.account;

import com.btsproject.btsproject20221102.domain.User;
import com.btsproject.btsproject20221102.domain.UserInfo;
import lombok.Builder;
import lombok.Data;

@Builder
@Data
public class UserInfoRespDto {
    private int userId;
    private String nickname;
    private String userImg;
    private String skill;

    private double scoreAvg;


}
