package com.btsproject.btsproject20221102.service.account;

import com.btsproject.btsproject20221102.domain.Key;
import com.btsproject.btsproject20221102.domain.User;
import com.btsproject.btsproject20221102.dto.account.*;
import com.btsproject.btsproject20221102.exception.CustomValidationException;
import com.btsproject.btsproject20221102.repository.account.AccountRepository;
import com.btsproject.btsproject20221102.service.auth.PrincipalDetails;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
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
//
//    @Override
//    public boolean searchPassword(PwSearchReqDto pwSearchReqDto) {
//        User user = User.builder()
//                .id(pwSearchReqDto.getId())
//                .password(new BCryptPasswordEncoder().encode(pwSearchReqDto.getNewPassword()))
//                .build();
//        return accountRepository.searchPassword(user) != 0;
//    }

    @Override
    public boolean deleteUser(int id) throws Exception {
        return accountRepository.deleteUser(id) != 0;
    }

    @Override
    public boolean checkAuthenticationToken(CertifiedDto certifiedDto) throws Exception {
        boolean result = false;

        Key key = accountRepository.getAuthenticationKey(certifiedDto.getId());
        if(key != null) {
            accountRepository.updateAuthenticationStatus(key.getId());

            if(key.getEnabled_key().equalsIgnoreCase(certifiedDto.getAccessKey())) {
                accountRepository.enabledUpdate(certifiedDto.getId());
                result = true;
            }
        }

        return result;
    }

    @Override
    public boolean checkAuthenticationTokenForgot(PwSearchReqDto pwSearchReqDto) throws Exception {
        boolean result = false;

        Key key = accountRepository.getAuthenticationKey(pwSearchReqDto.getId());
        if(key != null) {
            accountRepository.updateAuthenticationStatus(key.getId());

            if(key.getEnabled_key().equalsIgnoreCase(pwSearchReqDto.getAccessKey())) {
                result = true;
            }
        }

        return result;
    }

    @Override
    public void modifyForgotPassword(PwForgotReqDto pwForgotReqDto) throws Exception {

        Key key = accountRepository.getForgotAuthenticationKey(pwForgotReqDto.toKeyEntity());
        if(key == null) {
            Map<String, String> errorMap = new HashMap<String, String>();
            errorMap.put("error", "유효하지 않은 토큰값입니다.");
            throw new CustomValidationException("유효하지 않은 토큰값입니다.", errorMap);
        }

        if(!pwForgotReqDto.getNewPw().equals(pwForgotReqDto.getCheckNewPw())) {
            Map<String, String> errorMap = new HashMap<String, String>();
            errorMap.put("error", "비밀번호가 일치하지 않습니다.");
            throw new CustomValidationException("비밀번호가 일치하지 않습니다.", errorMap);
        }
        User user = User.builder().id(pwForgotReqDto.getId()).password(new BCryptPasswordEncoder().encode(pwForgotReqDto.getNewPw())).build();
        accountRepository.modifyPassword(user);
    }
}
