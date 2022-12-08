package com.btsproject.btsproject20221102.service.board;

import com.btsproject.btsproject20221102.dto.board.*;
import org.springframework.web.multipart.MultipartFile;

import java.util.List;
import java.util.Map;

public interface BoardService {
//    ------write------
    public String uploadSummernoteImg(MultipartFile file);
    public boolean deleteSummernoteImg(String tempName);
    public Map<String, String> uploadBoardImg(MultipartFile file, String tempName);
    public boolean saveBoard(WriteReqDto writeReqDto) throws Exception;



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

    //    ------update------
    public UpdateArticleRespDto loadUpdateArticle(int id) throws Exception;
    public boolean updateArticle(UpdateReqDto updateReqDto) throws Exception;
    public boolean updateCancel (UpdateCancelReqDto updateCancelDto) throws Exception;
    public boolean deleteArticle(ArticleDeleteReqDto articleDeleteReqDto) throws Exception;
}
