package com.btsproject.btsproject20221102.repository.account;

import com.btsproject.btsproject20221102.domain.*;
import org.apache.ibatis.annotations.Mapper;

import java.util.List;

@Mapper
public interface AccountRepository {
    public int save(User user);

    public User findUserByEmail(String username);

    public User findUserByNickname(String nickname);
    public User findUserByPhone(String phone);

    public int updateUserOauth2(User user);

    //회원 정보
    public UserInfo userInfo(int userId);

    /* 회원 정보 수정 */
    public int modifyProfile(User user);

    /* 프로필 이미지 변경 */
    public int modifyProfileImage(UserProfileImage userProfileImage);
    /* 비밀번호 변경 */
    public int modifyPassword(User user);

    public User getImgFile(int id) throws Exception;

    public int deleteUser(int id);

    /* 이메일 인증 부분 */
    public int saveKey(Key key);

    public int enabledUpdate(int id);

    public Key getAuthenticationKey(int user_id);

    public Key getForgotAuthenticationKey(Key key);

    public int updateAuthenticationStatus(int id);

    // 최근활동 게시물
    public List<LoadRecentboardList> loadRecentBoardList(int id);
}
