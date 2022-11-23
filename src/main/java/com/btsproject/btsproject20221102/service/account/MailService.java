package com.btsproject.btsproject20221102.service.account;


import com.btsproject.btsproject20221102.dto.email.SendMailDto;

import javax.mail.MessagingException;
import java.util.Map;

public interface MailService {

    public void sendEmail(SendMailDto sendMailDto) throws MessagingException;
    public void sendSignupAuthenticationEmail(SendMailDto sendMailDto) throws Exception;

    public void sendAccountPasswordEmail(SendMailDto sendMailDto) throws Exception;
}
