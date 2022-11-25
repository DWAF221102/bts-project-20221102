package com.btsproject.btsproject20221102.service.account;

import com.btsproject.btsproject20221102.domain.User;
import com.btsproject.btsproject20221102.dto.account.*;
import com.btsproject.btsproject20221102.service.auth.PrincipalDetails;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import com.btsproject.btsproject20221102.dto.account.SignupReqDto;
import org.springframework.web.multipart.MultipartFile;

public interface AccountService {

    public boolean checkUsername(String username) throws Exception;

    public boolean signup(SignupReqDto signupReqDto) throws Exception;

    public void modifyProfile(@AuthenticationPrincipal PrincipalDetails principalDetails, ModifyReqDto modifyReqDto) throws Exception;

    public void modifyProfileImage(@AuthenticationPrincipal PrincipalDetails principalDetails, MultipartFile multipartFile) throws Exception;

    public void modifyPassword(@AuthenticationPrincipal PrincipalDetails principalDetails, PwChangeReqDto pwChangeReqDto) throws Exception;

    public boolean deleteUser(int id) throws Exception;

    public boolean checkAuthenticationToken(CertifiedDto certifiedDto) throws Exception;

    public boolean checkAuthenticationTokenForgot(PwSearchReqDto pwSearchReqDto) throws Exception;

    public void modifyForgotPassword(PwForgotReqDto pwForgotReqDto) throws Exception;
}
