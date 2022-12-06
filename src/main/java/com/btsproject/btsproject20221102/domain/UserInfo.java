package com.btsproject.btsproject20221102.domain;

import com.btsproject.btsproject20221102.dto.account.UserInfoRespDto;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@AllArgsConstructor
@NoArgsConstructor
@Builder
@Data
public class UserInfo {
    private int id;
    private String nickname;
    private String user_img;
    private String skill;

    private double score_avg;

    public UserInfoRespDto userInfoRespDto(){
        return UserInfoRespDto.builder()
                .userId(id)
                .nickname(nickname)
                .userImg(user_img)
                .skill(skill)
                .scoreAvg(score_avg)
                .build();

    }

    }

