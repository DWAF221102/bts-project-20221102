package com.btsproject.btsproject20221102.service.account;

import com.btsproject.btsproject20221102.dto.account.CertifiedDto;
import com.btsproject.btsproject20221102.dto.account.SignupReqDto;

public interface AccountService {

    public boolean checkUsername(String username) throws Exception;

    public boolean signup(SignupReqDto signupReqDto) throws Exception;

    public boolean deleteUser(int id) throws Exception;


//    public boolean checkKey(SaveKeyReqDto saveKeyReqDto) throws Exception;

    public boolean checkAuthenticationToken(CertifiedDto certifiedDto) throws Exception;
}
