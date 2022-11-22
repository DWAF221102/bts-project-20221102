package com.btsproject.btsproject20221102.controller.api.email;

import com.btsproject.btsproject20221102.dto.CMRespDto;
import com.btsproject.btsproject20221102.dto.email.SendMailDto;
import com.btsproject.btsproject20221102.service.account.MailService;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.*;

@Slf4j
@Controller
@RequiredArgsConstructor
@RequestMapping("/api/email")
public class EmailApi {

    private final MailService mailService;

    @PostMapping("/signup")
    public ResponseEntity<?> sendEmail(@RequestBody SendMailDto sendMailDto) throws Exception {

        mailService.sendSignupAuthenticationEmail(sendMailDto);

        return ResponseEntity.ok(new CMRespDto<>(1, "메일 전송 성공", true));
    }

}
