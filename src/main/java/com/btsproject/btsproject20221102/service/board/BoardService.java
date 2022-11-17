package com.btsproject.btsproject20221102.service.board;

import com.btsproject.btsproject20221102.domain.Board;
import com.btsproject.btsproject20221102.domain.BoardImgFile;
import com.btsproject.btsproject20221102.dto.board.WriteReqDto;
import org.springframework.web.multipart.MultipartFile;

public interface BoardService {
    public BoardImgFile uploadImgService(MultipartFile file);

    public boolean saveBoard(WriteReqDto writeReqDto) throws Exception;
}
