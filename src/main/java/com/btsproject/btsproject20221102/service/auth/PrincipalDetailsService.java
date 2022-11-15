package com.btsproject.btsproject20221102.service.auth;

import com.btsproject.btsproject20221102.domain.User;
import com.btsproject.btsproject20221102.repository.account.AccountRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.stereotype.Service;

@Service
@RequiredArgsConstructor
public class PrincipalDetailsService implements UserDetailsService {

    private final AccountRepository accountRepository;
    @Override
    public UserDetails loadUserByUsername(String username) throws UsernameNotFoundException { //SecurityConfig의 username이 매개값으로 들어옴
        // 로그인을 하기 위해 가입된 user 정보를 조회하는 메소드
        User user = accountRepository.findUserByEmail(username);

        if (user == null) {
            throw new UsernameNotFoundException("존재하지 않는 아이디입니다.");
        }

        return new PrincipalDetails(user);
    }
}
