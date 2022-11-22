package com.btsproject.btsproject20221102.dto.email;

import lombok.Data;

@Data
public class SendMailDto {
    private String email;
    private String subject;
    private String content;
}
