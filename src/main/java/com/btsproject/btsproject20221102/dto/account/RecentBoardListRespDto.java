package com.btsproject.btsproject20221102.dto.account;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;
import org.springframework.security.core.annotation.AuthenticationPrincipal;

@NoArgsConstructor
@AllArgsConstructor
@Builder
@Data
public class RecentBoardListRespDto {
    private int userId;
    private String nickname;
    private int boardId;
    private String menuName;
    private String title;
    private String createDate;

}
