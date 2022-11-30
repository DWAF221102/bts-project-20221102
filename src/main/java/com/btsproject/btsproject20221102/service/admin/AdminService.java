package com.btsproject.btsproject20221102.service.admin;

import com.btsproject.btsproject20221102.dto.admin.AdminBoardListRespDto;
import com.btsproject.btsproject20221102.dto.admin.AdminQnAListRespDto;
import com.btsproject.btsproject20221102.dto.admin.AdminUserListRespDto;

import java.util.List;

public interface AdminService {

    public List<AdminUserListRespDto> loadAdminUser(String searchValue) throws Exception;

    public boolean deleteAdminUser(int id) throws Exception;

    public List<AdminBoardListRespDto> loadAdminBoard(String searchValue) throws Exception;

    public boolean deleteAdminBoard(int id) throws Exception;

    public List<AdminQnAListRespDto> loadAdminQnA(String searchValue, String statusValue) throws Exception;

    public boolean deleteAdminQnA(int id) throws Exception;
}
