package com.btsproject.btsproject20221102.domain;

import com.btsproject.btsproject20221102.service.auth.PrincipalDetails;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.time.LocalDateTime;

@Data
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class User {
    private int id;
    private int role_id;
    private String username;
    private String oauth_username;
    private String password;
    private String name;
    private String phone;
    private String nickname;
    private String skill;
    private String provider;
    private String user_img;
    private int enabled;
    private Role role;
    private LocalDateTime create_date;
    private LocalDateTime update_date;

    public void updatePrincipalDetails(PrincipalDetails principalDetails) {
        User principalUser = principalDetails.getUser();
        if(nickname != null) principalUser.setNickname(nickname);
        if(phone != null) principalUser.setPhone(phone);
        if(skill != null) principalUser.setSkill(skill);
    }
}
