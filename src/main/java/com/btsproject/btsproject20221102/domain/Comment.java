package com.btsproject.btsproject20221102.domain;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.time.LocalDateTime;
import java.util.List;


@Builder
@AllArgsConstructor
@NoArgsConstructor
@Data
public class Comment {
    private int comment_id;
    private int comment_user_id;
    private String comment_nickname;
    private String comment_user_img;
    private LocalDateTime comment_create_date;
    private String comment_content;
    private List<Recomment> recomment;
}
