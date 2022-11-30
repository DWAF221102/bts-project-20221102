package com.btsproject.btsproject20221102.repository;

import com.btsproject.btsproject20221102.domain.AsidePrice;
import com.btsproject.btsproject20221102.domain.IndexLoadList;
import com.btsproject.btsproject20221102.domain.IndexLoadQnAList;
import org.apache.ibatis.annotations.Mapper;

import java.util.List;

@Mapper
public interface IndexRepository {

    public List<IndexLoadList> loadIndexBoard(int menuId) throws Exception;

    public List<IndexLoadQnAList> loadIndexQnA() throws  Exception;

    public List<AsidePrice> loadPriceAside() throws Exception;
}
