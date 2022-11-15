package com.btsproject.btsproject20221102.service.account;

import com.btsproject.btsproject20221102.dto.account.SignupReqDto;

public interface AccountService {

    public boolean checkUsername(String username);

    public boolean signup(SignupReqDto signupReqDto) throws Exception;
}
