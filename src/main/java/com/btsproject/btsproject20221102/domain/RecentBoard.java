package com.btsproject.btsproject20221102.domain;

import lombok.Builder;
import lombok.Data;

import java.time.LocalDateTime;

@Builder
@Data
public class RecentBoard {
    private int id;
    private String title;
    private String subcategory_name;
    private LocalDateTime create_date;
}
