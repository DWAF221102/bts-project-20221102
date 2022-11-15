package com.btsproject.btsproject20221102.handler.auth;

import org.springframework.security.authentication.*;
import org.springframework.security.core.AuthenticationException;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.security.web.authentication.AuthenticationFailureHandler;

import javax.servlet.ServletException;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import java.io.IOException;

public class AuthFailureHandler implements AuthenticationFailureHandler {
    @Override
    public void onAuthenticationFailure(HttpServletRequest request, HttpServletResponse response, AuthenticationException exception) throws IOException, ServletException {
        // UsernameNotFoundException: 계정 없음.
        // BadCredentialsException: 비밀번호 불일치
        // AccountExpiredException: 계정 만료
        // CredentialsExpiredException: 비밀번호 만료
        // DisabledException: 계정 비활성화
        // LockedException: 계정 잠김
        if(exception.getClass() == UsernameNotFoundException.class || exception.getClass() == BadCredentialsException.class) {
            response.sendRedirect("/account/login?error=auth");  //메소드를 실행하면, HTTP 응답 헤더에 어떤 페이지로 이동하라는 값을 추가한다.
        } else{
            response.sendRedirect("/account/login?error");
        }
    }
}
