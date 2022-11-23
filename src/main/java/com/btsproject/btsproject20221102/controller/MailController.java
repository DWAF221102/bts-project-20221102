package com.btsproject.btsproject20221102.controller;

import com.btsproject.btsproject20221102.dto.account.CertifiedDto;
import com.btsproject.btsproject20221102.dto.account.PwSearchReqDto;
import com.btsproject.btsproject20221102.service.account.AccountService;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;

@Controller
@RequestMapping("/authentication")
@RequiredArgsConstructor
public class MailController {

    private final AccountService accountService;

    @GetMapping("/certified")
    public String enableOk(CertifiedDto certifiedDto) throws Exception {
        accountService.checkAuthenticationToken(certifiedDto);

        return "redirect:/index";
    }

    @GetMapping("/password/modification")
    public String passwordChangePage(PwSearchReqDto pwSearchReqDto) throws Exception {
        if(accountService.checkAuthenticationTokenForgot(pwSearchReqDto)) {
            return "account/passwordSearch";
        }
        return "redirect:/index";
    }



}
