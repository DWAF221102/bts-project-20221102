package com.btsproject.btsproject20221102.service.totalSearch;

import com.btsproject.btsproject20221102.dto.board.BoardRespDto;
import com.btsproject.btsproject20221102.dto.board.QnaBoardRespDto;
import com.btsproject.btsproject20221102.dto.index.IndexBoardListRespDto;
import com.btsproject.btsproject20221102.repository.TotalSearchRepository;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Service;

import java.io.Console;
import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

@Slf4j
@Service
@RequiredArgsConstructor
public class TotalSearchServiceImpl implements TotalSearchService{

    private final TotalSearchRepository totalSearchRepository;

    @Override
    public List<BoardRespDto> loadSearchBoard(int menuId, String searchValue) throws Exception {
        Map<String, Object> map = new HashMap<String, Object>();

        map.put("searchValue", searchValue);
        map.put("menuId", menuId);

        List<BoardRespDto> result = new ArrayList<BoardRespDto>();

        totalSearchRepository.loadSearchBoard(map).forEach(list -> {
            result.add(list.toBoardRespDto());
        });

        return result;
    }

    @Override
    public List<QnaBoardRespDto> loadSearchQna(String searchValue) throws Exception {
        List<QnaBoardRespDto> list = new ArrayList<QnaBoardRespDto>();

        totalSearchRepository.loadSearchQna(searchValue).forEach(qna -> {
//            log.info("qna :: {}", qna);
            list.add(qna.toQnaBoardRespDto());
        });

        return list;
    }
}
