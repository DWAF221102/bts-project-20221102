package com.btsproject.btsproject20221102.repository.account;

import com.btsproject.btsproject20221102.domain.User;
import org.apache.ibatis.annotations.Mapper;

@Mapper
public interface AccountRepository {
    public int save(User user);

    public User findUserByEmail(String username);

    public int deleteUser(int id);
}
