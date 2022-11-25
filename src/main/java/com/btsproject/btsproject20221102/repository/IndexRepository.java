package com.btsproject.btsproject20221102.repository;

import com.btsproject.btsproject20221102.domain.LoadList;
import org.apache.ibatis.annotations.Mapper;

import java.util.List;

@Mapper
public interface IndexRepository {

    public List<LoadList> loadIndexBoard(int menuId) throws Exception;
}
