package com.btsproject.btsproject20221102.service.account;

import com.btsproject.btsproject20221102.dto.account.SignupReqDto;
import com.btsproject.btsproject20221102.service.auth.PrincipalDetails;

public interface AccountService {

    public boolean checkUsername(String username) throws Exception;

    public boolean signup(SignupReqDto signupReqDto) throws Exception;

    public boolean deleteUser(PrincipalDetails principalDetails) throws Exception;
}
