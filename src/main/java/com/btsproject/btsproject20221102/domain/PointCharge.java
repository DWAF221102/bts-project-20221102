package com.btsproject.btsproject20221102.domain;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class PointCharge {
    private int id;
    private int point_id;
    private int type;
    private int point;
}
