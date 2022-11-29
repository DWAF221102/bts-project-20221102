package com.btsproject.btsproject20221102.domain;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.time.LocalDateTime;


@Builder
@AllArgsConstructor
@NoArgsConstructor
@Data
public class Recomment {
    private int recomment_id;
    private int recomment_user_id;
    private String recomment_nickname;
    private String recomment_user_img;
    private LocalDateTime recomment_create_date;
    private String recomment_content;
}
