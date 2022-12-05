package com.btsproject.btsproject20221102.repository;

import com.btsproject.btsproject20221102.domain.LoadList;
import com.btsproject.btsproject20221102.domain.QnaLoadList;
import org.apache.ibatis.annotations.Mapper;

import java.util.List;
import java.util.Map;

@Mapper
public interface TotalSearchRepository {

    public List<LoadList> loadSearchBoard(Map<String, Object> map) throws Exception;

    public List<QnaLoadList> loadSearchQna(String searchValue) throws Exception;
}
