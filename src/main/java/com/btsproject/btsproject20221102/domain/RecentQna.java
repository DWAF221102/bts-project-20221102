package com.btsproject.btsproject20221102.domain;

import lombok.Builder;
import lombok.Data;

import java.time.LocalDateTime;

@Builder
@Data
public class RecentQna {
    private int id;
    private String title;
    private String status;
    private String subcategory_name;
    private LocalDateTime create_date;
}
