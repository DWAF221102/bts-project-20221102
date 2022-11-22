package com.btsproject.btsproject20221102.service.account;

import com.btsproject.btsproject20221102.domain.User;
import com.btsproject.btsproject20221102.dto.account.ModifyReqDto;
import com.btsproject.btsproject20221102.dto.account.PwChangeReqDto;
import com.btsproject.btsproject20221102.dto.account.SignupReqDto;
import com.btsproject.btsproject20221102.exception.CustomValidationException;
import com.btsproject.btsproject20221102.repository.account.AccountRepository;
import com.btsproject.btsproject20221102.service.auth.PrincipalDetails;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.HashMap;
import java.util.Map;

@Slf4j   // 나중에 지움
@Service
@RequiredArgsConstructor
public class AccountServiceImpl implements AccountService {

    private final AccountRepository accountRepository;

    @Override
    public boolean checkUsername(String username) throws Exception {

        User user = accountRepository.findUserByEmail(username);
        if (user != null) {
            Map<String, String> errorMap = new HashMap<String, String>();
            errorMap.put("username", "이미 가입된 이메일입니다.");
            throw new CustomValidationException("CheckUsername Error", errorMap);
        }

        return true;
    }

    @Override
    public boolean signup(SignupReqDto signupReqDto) throws Exception {
        return accountRepository.save(signupReqDto.toUserEntity()) != 0;
    }

    // 회원 정보 변경
    @Transactional
    @Override
    public void modifyProfile(ModifyReqDto modifyReqDto) throws Exception {
        User user = null;
        user = accountRepository.findUserByEmail(modifyReqDto.toModifyEntity().getUsername());
        if(user == null){
            new IllegalStateException("해당 회원이 존재 하지 않습니다.");
        }
    }


// 비밀번호 변경
    @Override
    public void modifyPassword(PrincipalDetails principalDetails, PwChangeReqDto pwChangeReqDto) throws Exception {
        BCryptPasswordEncoder bCryptPasswordEncoder = new BCryptPasswordEncoder();
        if (bCryptPasswordEncoder.matches(pwChangeReqDto.getCurrentPw(), principalDetails.getUser().getPassword())) {
            if (pwChangeReqDto.getNewPw().equals(pwChangeReqDto.getCheckNewPw())) {
                String changedPw = bCryptPasswordEncoder.encode(pwChangeReqDto.getNewPw());
                User userEntity = principalDetails.getUser();
                userEntity.setPassword(bCryptPasswordEncoder.encode(pwChangeReqDto.getNewPw()));
                accountRepository.modifyPassword(userEntity);
                principalDetails.getUser().setPassword(changedPw);
            } else {
                Map<String, String> errorMap = new HashMap<String, String>();
                errorMap.put("newPasswordCheckError", "새 비밀번호가 서로 일치하지 않습니다.");
                throw new CustomValidationException("newPasswordCheckError", errorMap);
            }
        } else {
            Map<String, String> errorMap = new HashMap<String, String>();
            errorMap.put("currentPw", "기존 비밀번호가 일치하지 않습니다.");
            throw new CustomValidationException("password isNonCmp", errorMap);
        }
    }



        @Override
        public boolean deleteUser ( int id) throws Exception {
            accountRepository.deleteUser(id);

            return true;
        }

    }

