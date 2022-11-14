package com.btsproject.btsproject20221102.repository;

import com.btsproject.btsproject20221102.domain.User;
import org.apache.ibatis.annotations.Mapper;

@Mapper
public interface AccountRepository {
    public int save(User user);
}
