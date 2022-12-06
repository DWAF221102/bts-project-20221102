package com.btsproject.btsproject20221102.domain;

import com.btsproject.btsproject20221102.dto.account.MyprofileBoardRespDto;
import com.btsproject.btsproject20221102.dto.account.MyprofileQnaRespDto;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.time.LocalDateTime;
import java.time.format.DateTimeFormatter;

@Data
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class MyprofileQna {

    private int user_id;
    private int id;
    private String title;
    private String status;
    private String subcategory_name;
    private LocalDateTime create_date;

    public MyprofileQnaRespDto toMyprofileQnaRespDto() {
        return MyprofileQnaRespDto.builder()
                .userId(user_id)
                .id(id)
                .title(title)
                .status(status)
                .subcategoryName(subcategory_name)
                .createDate(create_date.format(DateTimeFormatter.ofPattern("yyyy년MM월dd일HH시mm분ss초")))
                .build();
    }
}
