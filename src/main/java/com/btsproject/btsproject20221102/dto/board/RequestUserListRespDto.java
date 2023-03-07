package com.btsproject.btsproject20221102.dto.board;


import lombok.Builder;
import lombok.Data;

@Data
@Builder
public class RequestUserListRespDto {

    private int id;
    private int qnaBoardId;
    private int userId;
    private String nickName;
    private double scoreAvg;
    private String skill;
    private String userImg;
}
