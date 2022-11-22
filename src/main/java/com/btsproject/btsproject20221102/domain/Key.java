package com.btsproject.btsproject20221102.domain;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.time.LocalDateTime;

@NoArgsConstructor
@AllArgsConstructor
@Data
@Builder
public class Key {
    private int id;
    private int user_id;
    private String enabled_key;
    private int authentication_status;
    private LocalDateTime create_date;
    private LocalDateTime update_date;
}
