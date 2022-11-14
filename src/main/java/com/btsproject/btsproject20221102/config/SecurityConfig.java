package com.btsproject.btsproject20221102.config;

import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.config.annotation.web.configuration.EnableWebSecurity;
import org.springframework.security.config.annotation.web.configuration.WebSecurityConfigurerAdapter;

@EnableWebSecurity  //기존의 WebSecurityConfigurerAdapter 클래스를 해당 SecurityConfig로 대체함.
@Configuration
public class SecurityConfig extends WebSecurityConfigurerAdapter {

//    @Bean
//    public BCryptPasswordEncoder passwordEncoder(){
//        return new BCryptPasswordEncoder();
//    }

    protected void configure(HttpSecurity http) throws Exception {
        http.csrf().disable();  //Cross site Request forgery로 사이트간 위조 요청, 즉 정상적인 사용자가 의도치 않은 위조요청을 보내는 것을 의미
        http.httpBasic().disable();
        http.authorizeRequests()

                .antMatchers("/admin/**","/api/admin/**")//지정한 주소를 가지고 권한을 줄건지 정함.
                //.hasRole("ADMIN")  하나만의 권할을 줄때
                .access("hasRole('ADMIN') or hasRole('MANAGER')")
                .antMatchers("/**")
                .permitAll();  //모든 접근 허용
    }

}
