package com.btsproject.btsproject20221102.service.auth;

import com.btsproject.btsproject20221102.domain.User;
import lombok.Getter;
import lombok.Setter;
import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.core.userdetails.UserDetails;

import java.util.ArrayList;
import java.util.Collection;

@Getter
public class PrincipalDetails implements UserDetails {

    @Setter
    private User user;

    public PrincipalDetails(User user) {
        this.user = user;
    }

    //계정의 권한 목록(ADMIN,MANAGER,MEMBER)을 리턴하는것.
    @Override
    public Collection<? extends GrantedAuthority> getAuthorities() {
        Collection<GrantedAuthority> authorities = new ArrayList<>();
        authorities.add(()->user.getRole().getRole());
        return authorities;
    }

    @Override
    public String getPassword() {
        return user.getPassword();
    }

    @Override
    public String getUsername() {
        return user.getUsername();
    }

    @Override
    public boolean isAccountNonExpired() {
        return true;                        // true = 계정이 만료되지 않음
    }

    @Override
    public boolean isAccountNonLocked() {
        return true;                        // true = 계정이 잠금되지 않음
    }

    @Override
    public boolean isCredentialsNonExpired() {
        return true;                        // true = 패스워드가 만료되지 않음
    }

    @Override
    public boolean isEnabled() {
        return user.getEnabled() == 1;                        // true = 계정 사용가능함.
    }
}
