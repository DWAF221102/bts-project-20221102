package com.btsproject.btsproject20221102.service.board;

import com.btsproject.btsproject20221102.domain.Article;
import com.btsproject.btsproject20221102.domain.BoardImgFile;
import com.btsproject.btsproject20221102.dto.board.ArticleRespDto;
import com.btsproject.btsproject20221102.dto.board.BoardRespDto;
import com.btsproject.btsproject20221102.dto.board.WriteReqDto;
import org.springframework.web.multipart.MultipartFile;

import java.util.List;

public interface BoardService {
    public BoardImgFile uploadImgService(MultipartFile file);

    public boolean saveBoard(WriteReqDto writeReqDto) throws Exception;

    public boolean deleteImg(MultipartFile file);

    public List<BoardRespDto> loadBoard(int page,
                                        int menuId,
                                        int categoryId,
                                        String subcategoryId,
                                        String showList,
                                        String searchValue) throws Exception;

    public ArticleRespDto loadArticle(int id) throws Exception;
}
