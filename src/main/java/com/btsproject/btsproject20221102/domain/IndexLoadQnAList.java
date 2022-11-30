package com.btsproject.btsproject20221102.domain;

import com.btsproject.btsproject20221102.dto.index.IndexQnAListRespDto;
import com.btsproject.btsproject20221102.dto.index.AsidePriceListRespDto;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;
import org.springframework.web.bind.annotation.RequestMapping;

import java.time.LocalDateTime;
import java.time.format.DateTimeFormatter;

@Builder
@AllArgsConstructor
@NoArgsConstructor
@Data
public class IndexLoadQnAList {

    private int user_id;
    private String nickname;
    private String user_img;

    private int id;
    private String title;
    private int price;
    private LocalDateTime create_date;

    private int like_count;

    public IndexQnAListRespDto toIndexQnARespDto() {
        return IndexQnAListRespDto.builder()
                .userId(user_id)
                .nickname(nickname)
                .userImg(user_img)
                .boardId(id)
                .title(title)
                .price(price)
                .createDate(create_date.format(DateTimeFormatter.ofPattern("yyyy년MM월dd일HH시mm분ss초")))
                .likeCount(like_count)
                .build();
    }


}
