package com.btsproject.btsproject20221102.service.board;

import com.btsproject.btsproject20221102.dto.board.ArticleRespDto;
import com.btsproject.btsproject20221102.dto.board.BoardRespDto;
import com.btsproject.btsproject20221102.dto.board.UpdateArticleRespDto;
import com.btsproject.btsproject20221102.dto.board.WriteReqDto;
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;
import java.util.List;
import java.util.Map;

public interface BoardService {
//    ------write------
    public String uploadSummernoteService(MultipartFile file);
    public boolean saveBoard(WriteReqDto writeReqDto) throws Exception;
    public Map<String, List<String>> uploadImgService(List<String> img , List<MultipartFile> files);
    public boolean deleteSummernoteImg(List<String> summernote);


//    -----board-----
    public List<BoardRespDto> loadBoard(int page,
                                        int menuId,
                                        int categoryId,
                                        String subcategoryId,
                                        String showList,
                                        String searchValue) throws Exception;

//    ------article------
    public boolean viewCount(int id) throws Exception;
    public ArticleRespDto loadArticle(int id) throws Exception;
    public boolean likeAdd(int id ,int userId) throws Exception;
    public boolean likeRemove(int id) throws Exception;
    public boolean commentWrite(int id ,int userId, String textValue) throws Exception;
    public boolean recommentWrite(int commentId ,int userId, String textValue) throws Exception;

    public boolean deleteArticle(int id) throws Exception;
    public UpdateArticleRespDto loadUpdateArticle(int id) throws Exception;
}
