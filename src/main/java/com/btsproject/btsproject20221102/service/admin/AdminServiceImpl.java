package com.btsproject.btsproject20221102.service.admin;

import com.btsproject.btsproject20221102.domain.Board;
import com.btsproject.btsproject20221102.dto.admin.AdminBoardListRespDto;
import com.btsproject.btsproject20221102.dto.admin.AdminQnAListRespDto;
import com.btsproject.btsproject20221102.dto.admin.AdminUserListRespDto;
import com.btsproject.btsproject20221102.repository.admin.AdminRepository;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

@Slf4j
@Service
@RequiredArgsConstructor
public class AdminServiceImpl implements AdminService{

    private final AdminRepository adminRepository;

    @Override
    public List<AdminUserListRespDto> loadAdminUser(String searchValue) throws Exception {

        List<AdminUserListRespDto> list = new ArrayList<AdminUserListRespDto>();
        adminRepository.loadAdminUser(searchValue).forEach(User -> {
//            log.info("userlist >>> {}", User);
            list.add(User.toAdminUserListRespDto());
        });
        return list;
    }

    @Override
    public boolean deleteAdminUser(int id) throws Exception {
        return adminRepository.deleteAdminUser(id) != 0;
    }

    @Override
    public List<AdminBoardListRespDto> loadAdminBoard(String searchValue) throws Exception {
        List<AdminBoardListRespDto> list = new ArrayList<AdminBoardListRespDto>();
        adminRepository.loadAdminBoard(searchValue).forEach(Board -> {
            list.add(Board.toAdminBoardListRespDto());
        });
        return list;
    }

    @Override
    public boolean deleteAdminBoard(int id) throws Exception {
        return adminRepository.deleteAdminBoard(id) != 0;
    }

    @Override
    public List<AdminQnAListRespDto> loadAdminQnA(String searchValue, String statusValue) throws Exception {
        List<AdminQnAListRespDto> list = new ArrayList<AdminQnAListRespDto>();
        Map<String, Object> map = new HashMap<>();
        map.put("searchValue", searchValue);
        map.put("statusValue", statusValue);

        adminRepository.loadAdminQnA(map).forEach(QnA -> {
            list.add(QnA.toAdminQnAListRespDto());
        });
        return list;
    }

    @Override
    public boolean deleteAdminQnA(int id) throws Exception {
        return adminRepository.deleteAdminQnA(id) != 0;
    }
}
