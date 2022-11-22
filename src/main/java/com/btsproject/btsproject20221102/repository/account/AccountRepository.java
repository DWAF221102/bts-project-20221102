package com.btsproject.btsproject20221102.repository.account;

import com.btsproject.btsproject20221102.domain.Key;
import com.btsproject.btsproject20221102.domain.User;
import org.apache.ibatis.annotations.Mapper;

@Mapper
public interface AccountRepository {
    public int save(User user);

    public User findUserByEmail(String username);
    public User modifyProfile(User user);

    public int modifyPassword(User user);

    public int deleteUser(int id);

    /* 이메일 인증 부분 */
    public int saveKey(Key key);

    public int enabledUpdate(int id);

    public Key getAuthenticationKey(int user_id);

    public int updateAuthenticationStatus(int id);
}
