package com.btsproject.btsproject20221102.service.account;

import com.btsproject.btsproject20221102.domain.User;
import com.btsproject.btsproject20221102.domain.UserInfo;
import com.btsproject.btsproject20221102.domain.MyLikeQna;
import com.btsproject.btsproject20221102.dto.account.*;
import com.btsproject.btsproject20221102.service.auth.PrincipalDetails;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import com.btsproject.btsproject20221102.dto.account.SignupReqDto;
import org.springframework.web.multipart.MultipartFile;

import java.util.List;

public interface AccountService {

    public boolean checkUsername(String username) throws Exception;

    public boolean checkNickname(String nickname, @AuthenticationPrincipal PrincipalDetails principalDetails) throws Exception;

    public boolean checkPhone(String phone, @AuthenticationPrincipal PrincipalDetails principalDetails) throws Exception;

    public boolean signup(SignupReqDto signupReqDto) throws Exception;

    public UserInfo getUserInfo(int userId) throws Exception;

    public void modifyProfile(@AuthenticationPrincipal PrincipalDetails principalDetails, ModifyReqDto modifyReqDto) throws Exception;

    public void modifyProfileImage(@AuthenticationPrincipal PrincipalDetails principalDetails, MultipartFile multipartFile) throws Exception;

    public void modifyPassword(@AuthenticationPrincipal PrincipalDetails principalDetails, PwChangeReqDto pwChangeReqDto) throws Exception;

    public boolean deleteUser(int id) throws Exception;

    public boolean checkAuthenticationToken(CertifiedDto certifiedDto) throws Exception;

    public boolean checkAuthenticationTokenForgot(PwSearchReqDto pwSearchReqDto) throws Exception;

    public void modifyForgotPassword(PwForgotReqDto pwForgotReqDto) throws Exception;

    public List<RecentBoardListRespDto> loadRecentBoardList(int userId) throws Exception;

    public List<MyprofileBoardRespDto> loadMyprofileBoardList(int userId) throws Exception;

    public List<MyprofileQnaRespDto> loadMyprofileQnaList(int userId) throws Exception;

    public List<MyLikeBoardRespDto> loadMyLikeBoardList(int userId) throws Exception;

    public List<MyLikeQnaRespDto> loadMyLikeQnaList(int userId) throws Exception;
}
