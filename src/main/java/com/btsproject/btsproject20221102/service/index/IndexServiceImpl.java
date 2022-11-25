package com.btsproject.btsproject20221102.service.index;

import com.btsproject.btsproject20221102.aop.annotation.LogAspect;
import com.btsproject.btsproject20221102.dto.index.IndexBoardListRespDto;
import com.btsproject.btsproject20221102.repository.IndexRepository;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.List;

@Slf4j
@Service
@RequiredArgsConstructor
public class IndexServiceImpl implements IndexService{

    private final IndexRepository indexRepository;

    @Override
    public List<IndexBoardListRespDto> loadIndexBoard(int menuId) throws Exception {


        List<IndexBoardListRespDto> list = new ArrayList<IndexBoardListRespDto>();

        indexRepository.loadIndexBoard(menuId).forEach(board -> {
            list.add(board.toIndexBoardRespDto());
            log.info("board >> {}", board);
        });

        return list;
    }
}
