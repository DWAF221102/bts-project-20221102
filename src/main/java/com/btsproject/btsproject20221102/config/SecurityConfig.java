package com.btsproject.btsproject20221102.config;

import com.btsproject.btsproject20221102.handler.auth.AuthFailureHandler;
import com.btsproject.btsproject20221102.service.auth.PrincipalOauth2Service;
import lombok.RequiredArgsConstructor;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.config.annotation.authentication.builders.AuthenticationManagerBuilder;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.config.annotation.web.builders.WebSecurity;
import org.springframework.security.config.annotation.web.configuration.EnableWebSecurity;
import org.springframework.security.config.annotation.web.configuration.WebSecurityConfigurerAdapter;
import org.springframework.security.core.Authentication;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.security.web.authentication.AuthenticationFailureHandler;
import org.springframework.security.web.authentication.AuthenticationSuccessHandler;
import org.springframework.security.web.firewall.DefaultHttpFirewall;
import org.springframework.security.web.firewall.HttpFirewall;
import org.springframework.security.web.util.matcher.AntPathRequestMatcher;

import javax.servlet.ServletException;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import java.io.IOException;

@RequiredArgsConstructor
@EnableWebSecurity  //기존의 WebSecurityConfigurerAdapter 클래스를 해당 SecurityConfig로 대체함.
@Configuration      // config Bean이라는 것을 명시해주는 어노테이션.
public class SecurityConfig extends WebSecurityConfigurerAdapter {

    // Spring Security에 정의되어 있는 Interface로 이 핸들러를 구현해주고 SecurityConfig에서 설정을 해주면 자동으로 핸들러로 등록이 된다.
    private final AuthenticationFailureHandler authenticationFailureHandler;

    private final PrincipalOauth2Service principalOauth2Service;

    // 비밀번호 암호화
    @Bean
    public BCryptPasswordEncoder passwordEncoder(){
        return new BCryptPasswordEncoder();
    }

//    @Override
//    public void configure(WebSecurity web) throws Exception {
//        // 인증을 무시하기 위한 설정
//        web.ignoring().antMatchers("/css/**","/js/**","/img/**");
//    }

    //AuthenticationManager Bean 등록

    // URL 더블슬래쉬 허용
    @Override
    public void configure(WebSecurity web) throws Exception {
        web.httpFirewall(defaultHttpFirewall());
    }
    @Bean
    public HttpFirewall defaultHttpFirewall(){
        return new DefaultHttpFirewall();
    }
    @Bean
    @Override
    protected AuthenticationManager authenticationManager() throws Exception {
        // AuthenticationManager: 그냥 username, password가 아닌 토큰을 받아서 객체를 만듦.
        return super.authenticationManager();
    }

    @Override
    protected void configure(HttpSecurity http) throws Exception {
        http.csrf()
                .ignoringAntMatchers("/api/account/point/charge")  // 포인트 충전
                .disable();  //Cross site Request forgery로 사이트간 위조 요청, 즉 정상적인 사용자가 의도치 않은 위조요청을 보내는 것을 의미
        http.httpBasic().disable();
        http.authorizeRequests()

                // 접근 권한 관련
                .antMatchers("/admin/**","/api/admin/**")//지정한 주소를 가지고 권한을 줄건지 정함.
                .hasRole("ADMIN")  // 하나만의 권할을 줄때
//                .access("hasRole('ADMIN') or hasRole('MANAGER')")
//                .antMatchers("/myprofile")
//                .permitAll()

                // 로그인 관련
                .and()
                .formLogin()
                .loginPage("/login")                 // GET 요청
                .loginProcessingUrl("/account/login")        // 로그인 로직(PrincipalDetailsService) POST 요청
                .failureHandler(new AuthFailureHandler())   //실패핸들러

                // oauth 로그인
                .and()
                .oauth2Login()
                .loginPage("/login")
                .userInfoEndpoint()
                .userService(principalOauth2Service)
                .and()
                .defaultSuccessUrl("/index")                // 로그인 성공 후 리다이렉트 주소

                // 로그아웃 관련
                .and()
                .logout()
                .logoutUrl("/logout")
                .logoutSuccessUrl("/index")
                .invalidateHttpSession(true)  // 인증정보를 지우고 세션을 무효화


                // 세션 관련
                .and()
                .sessionManagement()
                .maximumSessions(-1)  //세션 최대 허용수. -1은 무제한
                .maxSessionsPreventsLogin(true);  // true: 중복로그인 막음. false: 이전 로그인의 세션을 해제
    }

}
