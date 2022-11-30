package com.btsproject.btsproject20221102.controller.api.admin;

import com.btsproject.btsproject20221102.dto.CMRespDto;
import com.btsproject.btsproject20221102.service.admin.AdminService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.lang.Nullable;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/admin")
@RequiredArgsConstructor
public class adminApi {

    private final AdminService adminService;

    @GetMapping("/userlist")
    public ResponseEntity<?> loadAdminUserList(@RequestParam @Nullable String searchValue) throws Exception {
        return ResponseEntity.ok(new CMRespDto<>(1, "유저리스트 불러오기 완료.", adminService.loadAdminUser(searchValue)));
    }

    @DeleteMapping("/userlist/delete/{id}")
    public ResponseEntity<?> deleteAdminUser(@PathVariable int id) throws Exception {

        return ResponseEntity.ok(new CMRespDto<>(1, "유저 삭제 완료.", adminService.deleteAdminUser(id)));
    }

    @GetMapping("/boardlist")
    public ResponseEntity<?> loadAdminBoardList(@RequestParam @Nullable String searchValue) throws Exception {
        return ResponseEntity.ok(new CMRespDto<>(1, "게시물 리스트 불러오기 완료.", adminService.loadAdminBoard(searchValue)));
    }

    @DeleteMapping("boardlist/delete/{id}")
    public ResponseEntity<?> deleteAdminBoard(@PathVariable int id) throws Exception {

        return ResponseEntity.ok(new CMRespDto<>(1, "게시글 삭제 완료.", adminService.deleteAdminBoard(id)));
    }

    @GetMapping("/qnalist")
    public ResponseEntity<?> loadAdminQnAList(@RequestParam @Nullable String searchValue,
                                              @RequestParam @Nullable String statusValue) throws Exception {
        return ResponseEntity.ok(new CMRespDto<>(1, "QnA 리스트 불러오기 완료.", adminService.loadAdminQnA(searchValue, statusValue)));
    }

    @DeleteMapping("qnalist/delete/{id}")
    public ResponseEntity<?> deleteAdminQnA(@PathVariable int id) throws Exception {

        return ResponseEntity.ok(new CMRespDto<>(1, "QnA 게시글 삭제 완료.", adminService.deleteAdminQnA(id)));
    }
}
