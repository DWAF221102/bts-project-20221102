package com.btsproject.btsproject20221102.controller.api.account;

import com.btsproject.btsproject20221102.dto.CMRespDto;
import com.btsproject.btsproject20221102.dto.Validation.ValidationSequence;
import com.btsproject.btsproject20221102.dto.account.SignupReqDto;
import com.btsproject.btsproject20221102.service.account.AccountService;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.http.ResponseEntity;
import org.springframework.validation.BindingResult;
import org.springframework.validation.annotation.Validated;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@Slf4j
@RequestMapping("/api/account")
@RestController
@RequiredArgsConstructor
public class AccountApi {

    private final AccountService accountService;

    @PostMapping("/signup")
    public ResponseEntity<?> signup(@Validated(ValidationSequence.class) @RequestBody SignupReqDto signupReqDto, BindingResult bindingResult) throws Exception {

        accountService.checkUsername(signupReqDto.getUsername());

        accountService.signup(signupReqDto);

        return ResponseEntity.ok().body(new CMRespDto<>(1, "회원가입 완료", signupReqDto));
    }
}
