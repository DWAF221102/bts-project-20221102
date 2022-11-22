package com.btsproject.btsproject20221102.service.account;

import com.btsproject.btsproject20221102.domain.User;
import com.btsproject.btsproject20221102.dto.account.ModifyReqDto;
import com.btsproject.btsproject20221102.dto.account.PwChangeReqDto;
import com.btsproject.btsproject20221102.dto.account.SignupReqDto;
import com.btsproject.btsproject20221102.service.auth.PrincipalDetails;
import org.springframework.security.core.annotation.AuthenticationPrincipal;

public interface AccountService {

    public boolean checkUsername(String username) throws Exception;

    public boolean signup(SignupReqDto signupReqDto) throws Exception;

    public void modifyProfile(ModifyReqDto modifyReqDto) throws Exception;

    public void modifyPassword(@AuthenticationPrincipal PrincipalDetails principalDetails, PwChangeReqDto pwChangeReqDto) throws Exception;


    public boolean deleteUser(int id) throws Exception;

}
