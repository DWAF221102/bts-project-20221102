package com.btsproject.btsproject20221102.service.auth;


import com.btsproject.btsproject20221102.domain.User;
import com.btsproject.btsproject20221102.repository.account.AccountRepository;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.security.oauth2.client.userinfo.DefaultOAuth2UserService;
import org.springframework.security.oauth2.client.userinfo.OAuth2UserRequest;
import org.springframework.security.oauth2.core.OAuth2AuthenticationException;
import org.springframework.security.oauth2.core.user.OAuth2User;
import org.springframework.stereotype.Service;

import java.util.Map;
import java.util.UUID;

@Slf4j
@Service
@RequiredArgsConstructor
public class PrincipalOauth2Service extends DefaultOAuth2UserService {
    private final AccountRepository accountRepository;

    @Override
    public OAuth2User loadUser(OAuth2UserRequest userRequest) throws OAuth2AuthenticationException {
        String provider = userRequest.getClientRegistration().getClientName();  // provider name
        OAuth2User oAuth2User = super.loadUser(userRequest);  //엑세스 토큰을 이용해 서버로부터 사용자 정보 받아옴.

        log.info("userRequest >>>>> {}", userRequest);
        log.info("userRequest >>>>> {}", userRequest.getClientRegistration());
        log.info("userRequest >>>>> {}", oAuth2User.getAttributes());

        User user = getOauth2User(provider, oAuth2User.getAttributes());

        return new PrincipalDetails(user, oAuth2User.getAttributes());
    }

    private User getOauth2User(String provider, Map<String, Object> attributes) {
        Map<String, Object> response = null;
        User user = null;
        String oauth2_id = null;
        String id = null;
        String name = null;
        String username = null;
        String phone = null;
        String nickname = null;
        String profileImg = null;

        if(provider.equalsIgnoreCase("naver")){
            response = (Map<String, Object>) attributes.get("response");
            id = (String) response.get("id");
            username = (String) response.get("email");
            phone = (String) response.get("mobile");
            name = (String) response.get("name");
            nickname = (String) response.get("nickname");
            profileImg = (String) response.get("profile_image");
        }
        else if(provider.equalsIgnoreCase("kakao")){
            response = (Map<String, Object>) attributes.get("kakao_account");
            id = String.valueOf(attributes.get("id"));
            username = String.valueOf(response.get("email"));
            nickname = (String) ((Map<String, Object>) response.get("profile")).get("nickname");
            profileImg = (String) ((Map<String, Object>) response.get("profile")).get("profile_image_url");
        }

        oauth2_id = provider + "_" + id;
        user = accountRepository.findUserByEmail(username);
        if(user == null){
        // 유저 이미지 있는데 기본이미지 적용(회원가입 변경)
            if(provider.equalsIgnoreCase("naver")) {
                user = User.builder()
                        .username(username)
                        .oauth_username(oauth2_id)
                        .password(new BCryptPasswordEncoder().encode(UUID.randomUUID().toString().replaceAll("-", "")))
                        .name(name)
                        .role_id(1)
                        .provider(provider)
                        .phone(phone)
                        .nickname(nickname)
                        .user_img(profileImg)
                        .build();
            }
            else if(provider.equalsIgnoreCase("kakao")){
                user = User.builder()
                        .username(username)
                        .oauth_username(oauth2_id)
                        .password(new BCryptPasswordEncoder().encode(UUID.randomUUID().toString().replaceAll("-", "")))
                        .name(nickname)
                        .nickname(nickname)
                        .role_id(1)
                        .provider(provider)
                        .user_img(profileImg)
                        .build();
            }
            accountRepository.save(user);
        }else if(user.getOauth_username() == null){
            user.setOauth_username(oauth2_id);
            user.setProvider(provider);
            accountRepository.updateUserOauth2(user);

        }
        return user;
    }
}
