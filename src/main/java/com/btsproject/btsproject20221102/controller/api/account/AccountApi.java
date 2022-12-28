package com.btsproject.btsproject20221102.controller.api.account;

import com.btsproject.btsproject20221102.aop.annotation.ValidAspect;
import com.btsproject.btsproject20221102.domain.User;
import com.btsproject.btsproject20221102.dto.CMRespDto;
import com.btsproject.btsproject20221102.dto.account.*;
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
import org.springframework.web.multipart.MultipartFile;

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

    // 유저 정보
    @GetMapping("/user/{userId}")
    public ResponseEntity<?> getUser(@PathVariable int userId)throws Exception{
        return ResponseEntity.ok().body(new CMRespDto<>(1,"getUserSuccess", accountService.getUserInfo(userId)));
    }

//    로그인 유효성 검사
    @ValidAspect
    @PostMapping("/login")
    public ResponseEntity<?> login(@Valid @RequestBody LoginReqDto loginReqDto, BindingResult bindingResult)throws Exception{
        return ResponseEntity.ok(new CMRespDto<>(1, "success", true));
}

    // 리다이렉트


    // 회원 정보 수정
    @PutMapping("/myprofile")
    public ResponseEntity<?> modifyProfile( @RequestBody ModifyReqDto modifyReqDto, @AuthenticationPrincipal PrincipalDetails principalDetails) throws Exception {
        accountService.modifyProfile(principalDetails, modifyReqDto);
        return ResponseEntity.ok(new CMRespDto<>(1,"success", modifyReqDto));
    }

    //프로필 이미지 변경
    @PostMapping("/myprofile")
    public ResponseEntity<?> modifyProfileImage(@AuthenticationPrincipal PrincipalDetails principalDetails,
                                                MultipartFile file) throws Exception {  // MultipartFile 변수명은 name값과 같게해야함.

        accountService.modifyProfileImage(principalDetails, file);
        return ResponseEntity.ok(new CMRespDto<>(1, "success", true));
    }


    // 비밀 번호 변경
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

    ////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

    // 마이페이지 포인트
    @GetMapping("/myactivity/point/{userId}")
    public ResponseEntity<?> loadPoint(@PathVariable int userId) throws Exception {

        return ResponseEntity.ok(new CMRespDto<>(1,"포인트 불러오기 완료", accountService.point(userId)));
    }


    // 최근 게시물
    @GetMapping("/myactivity/{userid}")
    public ResponseEntity<?> loadRecentActivity(@PathVariable int userid) throws Exception {

        return ResponseEntity.ok(new CMRespDto<>(1, "최근활동 게시물 불러오기 완료",accountService.loadRecentBoardList(userid)));
    }
    @GetMapping("/myactivity/article/{userid}")
    public ResponseEntity<?> loadMyactivityBoard(@PathVariable int userid) throws Exception {
        return ResponseEntity.ok(new CMRespDto<>(1, "나의활동 게시물 불러오기 완료", accountService.loadMyprofileBoardList(userid)));
    }

    @GetMapping("/myactivity/qna/{userid}")
    public ResponseEntity<?> loadMyactivityQna(@PathVariable int userid) throws Exception {
        return ResponseEntity.ok(new CMRespDto<>(1, "나의활동 QnA 불러오기 완료", accountService.loadMyprofileQnaList(userid)));
    }

    @GetMapping("/myactivity/scrap/board/{userid}")
    public ResponseEntity<?> loadMyLikeBoard(@PathVariable int userid) throws Exception {
        return ResponseEntity.ok(new CMRespDto<>(1, "나의활동 QnA 불러오기 완료", accountService.loadMyLikeBoardList(userid)));
    }

    @GetMapping("/myactivity/scrap/qna/{userid}")
    public ResponseEntity<?> loadMyLikeQna(@PathVariable int userid) throws Exception {
        return ResponseEntity.ok(new CMRespDto<>(1, "나의활동 QnA 불러오기 완료", accountService.loadMyLikeQnaList(userid)));
    }


}
