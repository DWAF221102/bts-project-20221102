package com.btsproject.btsproject20221102.domain;

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


}
