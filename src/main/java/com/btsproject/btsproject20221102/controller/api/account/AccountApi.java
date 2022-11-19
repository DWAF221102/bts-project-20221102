package com.btsproject.btsproject20221102.controller.api.account;

import com.btsproject.btsproject20221102.aop.annotation.ValidAspect;
import com.btsproject.btsproject20221102.dto.CMRespDto;
import com.btsproject.btsproject20221102.dto.Validation.ValidationSequence;
import com.btsproject.btsproject20221102.dto.account.LoginReqDto;
import com.btsproject.btsproject20221102.dto.account.SignupReqDto;
import com.btsproject.btsproject20221102.service.account.AccountService;
import com.btsproject.btsproject20221102.service.account.MailService;
import com.btsproject.btsproject20221102.service.auth.PrincipalDetails;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.validation.BindingResult;
import org.springframework.web.bind.annotation.*;
import javax.validation.Valid;
import java.rmi.registry.Registry;
import java.util.Map;

@Slf4j
@RequestMapping("/api/account")
@RestController
@RequiredArgsConstructor
public class AccountApi {

    private final AccountService accountService;
    private final MailService mailService;

    @ValidAspect
    @PostMapping("/signup")
    public ResponseEntity<?> signup(@Valid @RequestBody SignupReqDto signupReqDto, BindingResult bindingResult) throws Exception {

        accountService.checkUsername(signupReqDto.getUsername());

        accountService.signup(signupReqDto);

        return ResponseEntity.ok().body(new CMRespDto<>(1, "회원가입 완료", signupReqDto));
    }

    @DeleteMapping("/delete/{id}")
    public ResponseEntity<?> delete(@PathVariable int id, @AuthenticationPrincipal PrincipalDetails principalDetails) throws Exception {
        id = principalDetails.getUser().getId();
        return ResponseEntity.ok(new CMRespDto<>(1, "회원탈퇴 완료", accountService.deleteUser(id)));
    }


    // 이메일 인증 api
    @PostMapping("/signup/mailcertified")
    public ResponseEntity<?> mailCertified(@RequestBody Map<String, Object> params) throws Exception {

        log.info("email params={}", params);

        return ResponseEntity.ok(new CMRespDto<>(1, "이메일 전송완료", mailService.sendEmail((String) params.get("username"), (String) params.get("subject"), (String) params.get("body"))));
    }
}
