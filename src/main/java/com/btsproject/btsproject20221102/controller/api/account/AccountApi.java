package com.btsproject.btsproject20221102.controller.api.account;

import com.btsproject.btsproject20221102.aop.annotation.ValidAspect;
import com.btsproject.btsproject20221102.domain.User;
import com.btsproject.btsproject20221102.dto.CMRespDto;
import com.btsproject.btsproject20221102.dto.account.ModifyReqDto;
import com.btsproject.btsproject20221102.dto.account.PwChangeReqDto;
import com.btsproject.btsproject20221102.dto.account.PwForgotReqDto;
import com.btsproject.btsproject20221102.dto.account.SignupReqDto;
import com.btsproject.btsproject20221102.service.account.AccountService;
import com.btsproject.btsproject20221102.service.account.MailService;
import com.btsproject.btsproject20221102.service.auth.PrincipalDetails;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.http.ResponseEntity;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.validation.BindingResult;
import org.springframework.web.bind.annotation.*;
import javax.validation.Valid;

@Slf4j
@RequestMapping("/api/account")
@RestController
@RequiredArgsConstructor
public class AccountApi {

    private final AccountService accountService;
    private final AuthenticationManager authenticationManager;
    private final MailService mailService;

    @ValidAspect
    @PostMapping("/signup")
    public ResponseEntity<?> signup(@Valid @RequestBody SignupReqDto signupReqDto, BindingResult bindingResult) throws Exception {

        accountService.checkUsername(signupReqDto.getUsername());

        accountService.signup(signupReqDto);

        return ResponseEntity.ok().body(new CMRespDto<>(1, "회원가입 완료", signupReqDto));
    }

<<<<<<< HEAD
=======
//    로그인 유효성 검사
    @ValidAspect
    @PostMapping("/login")
    public ResponseEntity<?> login(@Valid @RequestBody LoginReqDto loginReqDto, BindingResult bindingResult)throws Exception{
        return ResponseEntity.ok(new CMRespDto<>(1, "success", true));
}

>>>>>>> origin/duckhyeon
    @PutMapping("/myprofile")
    public ResponseEntity<?> modifyProfile(@RequestBody ModifyReqDto modifyReqDto, @AuthenticationPrincipal PrincipalDetails principalDetails) throws Exception {
        accountService.modifyProfile(principalDetails, modifyReqDto);

        return ResponseEntity.ok(new CMRespDto<>(1,"success", modifyReqDto));
    }

    @ValidAspect
    @PutMapping("/myprofile/password")
    public ResponseEntity<?> changePassword(@Valid @RequestBody PwChangeReqDto pwChangeReqDto, BindingResult bindingResult,
    @AuthenticationPrincipal PrincipalDetails principalDetails) throws  Exception {
        System.out.println("pwChangeReqDto: " + pwChangeReqDto);
        log.info("비밀번호 변경 요청 발생");
        accountService.modifyPassword(principalDetails, pwChangeReqDto);

        return ResponseEntity.ok(new CMRespDto<>(1, "success", pwChangeReqDto));
    }


    @DeleteMapping("/delete/{id}")
    public ResponseEntity<?> delete(@PathVariable int id, @AuthenticationPrincipal PrincipalDetails principalDetails) throws Exception {
        id = principalDetails.getUser().getId();
        return ResponseEntity.ok(new CMRespDto<>(1, "회원탈퇴 완료", accountService.deleteUser(id)));
    }

    @ValidAspect
    @PutMapping("/forgot/password")
    public ResponseEntity<?> forgotPassword(@Valid @RequestBody PwForgotReqDto pwForgotReqDto, BindingResult bindingResult) throws  Exception {
        accountService.modifyForgotPassword(pwForgotReqDto);
        return ResponseEntity.ok(new CMRespDto<>(1, "success", true));
    }


}
