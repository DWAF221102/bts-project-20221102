package com.btsproject.btsproject20221102.repository.admin;

import com.btsproject.btsproject20221102.domain.AdminBoardList;
import com.btsproject.btsproject20221102.domain.AdminQnAList;
import com.btsproject.btsproject20221102.domain.AdminUserList;
import org.apache.ibatis.annotations.Mapper;

import java.util.List;
import java.util.Map;

@Mapper
public interface AdminRepository {

    public List<AdminUserList> loadAdminUser(String searchValue) throws Exception;

    public int deleteAdminUser(int id) throws Exception;

    public List<AdminBoardList> loadAdminBoard(String searchValue) throws Exception;

    public int deleteAdminBoard(int id) throws Exception;

    public List<AdminQnAList> loadAdminQnA(Map<String, Object> map) throws Exception;

    public int deleteAdminQnA(int id) throws Exception;
}
