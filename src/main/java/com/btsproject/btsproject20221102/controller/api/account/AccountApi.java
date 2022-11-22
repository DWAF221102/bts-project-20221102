package com.btsproject.btsproject20221102.controller.api.account;

import com.btsproject.btsproject20221102.aop.annotation.LogAspect;
import com.btsproject.btsproject20221102.aop.annotation.ValidAspect;
import com.btsproject.btsproject20221102.domain.User;
import com.btsproject.btsproject20221102.dto.CMRespDto;
import com.btsproject.btsproject20221102.dto.Validation.ValidationSequence;
import com.btsproject.btsproject20221102.dto.account.LoginReqDto;
import com.btsproject.btsproject20221102.dto.account.ModifyReqDto;
import com.btsproject.btsproject20221102.dto.account.PwChangeReqDto;
import com.btsproject.btsproject20221102.dto.account.CertifiedDto;
import com.btsproject.btsproject20221102.dto.account.SignupReqDto;
import com.btsproject.btsproject20221102.service.account.AccountService;
import com.btsproject.btsproject20221102.service.account.MailService;
import com.btsproject.btsproject20221102.service.auth.PrincipalDetails;
import com.btsproject.btsproject20221102.service.auth.PrincipalDetailsService;
import com.google.gson.JsonObject;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.ui.Model;
import org.springframework.validation.BindingResult;
import org.springframework.validation.Errors;
import org.springframework.web.bind.annotation.*;

import javax.servlet.http.HttpSession;
import javax.validation.Valid;
import java.util.Map;

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

//    로그인 유효성 검사
//    @ValidAspect
//    @GetMapping("/login")
//    public ResponseEntity<?> login(@Valid @RequestBody LoginReqDto loginReqDto, BindingResult bindingResult)throws Exception{
//        return ResponseEntity.ok(new CMRespDto<>(1, "success", true));
//}

    @PutMapping("/myprofile")
    public ResponseEntity<?> modifyProfile(@RequestBody User user, ModifyReqDto modifyReqDto) throws Exception {
        accountService.modifyProfile(modifyReqDto);
        
        // 변경된 세션 등록
        Authentication authentication = authenticationManager.authenticate(
                new UsernamePasswordAuthenticationToken(user.getUsername(),user.getPassword()));
        SecurityContextHolder.getContext().setAuthentication(authentication);
        return ResponseEntity.ok().body(new CMRespDto<>(1,"success", user));
    }

    @ValidAspect
    @PutMapping("/forgot/password-change")
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


}
