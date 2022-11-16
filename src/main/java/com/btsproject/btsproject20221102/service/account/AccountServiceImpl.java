package com.btsproject.btsproject20221102.service.account;

import com.btsproject.btsproject20221102.domain.User;
import com.btsproject.btsproject20221102.dto.account.SignupReqDto;
import com.btsproject.btsproject20221102.exception.CustomValidationException;
import com.btsproject.btsproject20221102.repository.account.AccountRepository;
import com.btsproject.btsproject20221102.service.auth.PrincipalDetails;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.HashMap;
import java.util.Map;

@Service
@RequiredArgsConstructor
public class AccountServiceImpl implements AccountService{

    private final AccountRepository accountRepository;

    @Override
    public boolean checkUsername(String username) throws Exception{

        User user = accountRepository.findUserByEmail(username);
        if(user != null) {
            Map<String, String> errorMap = new HashMap<String, String>();
            errorMap.put("checkUsernameFlag", "이미 가입된 이메일입니다.");
            throw new CustomValidationException("CheckUsername Error", errorMap);
        }

        return true;
    }

    @Override
    public boolean signup(SignupReqDto signupReqDto) throws Exception {
        return accountRepository.save(signupReqDto.toUserEntity()) != 0 ;
    }

    @Override
    public boolean deleteUser(PrincipalDetails principalDetails) throws Exception {
        int id = principalDetails.getUser().getId();
        accountRepository.deleteUser(id);

        return true;
    }

}
