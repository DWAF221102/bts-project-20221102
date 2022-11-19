package com.btsproject.btsproject20221102.service.account;


import java.util.Map;

public interface MailService {

    public Map<String, Object> sendEmail(String toAddress, String subject, String body);
}
