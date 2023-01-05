package com.btsproject.btsproject20221102.service.board;

import com.btsproject.btsproject20221102.domain.Board;
import com.btsproject.btsproject20221102.domain.BoardImgFile;
import com.btsproject.btsproject20221102.domain.UpdateArticle;
import com.btsproject.btsproject20221102.dto.board.*;
import com.btsproject.btsproject20221102.repository.board.BoardRepository;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;

import java.io.*;
import java.nio.file.Files;
import java.nio.file.Path;
import java.nio.file.Paths;
import java.util.*;

@Slf4j
@Service
@RequiredArgsConstructor
public class BoardServiceImpl implements BoardService {

    @Value("${file.path}")
    private String filePath;

    private final BoardRepository boardRepository;

    @Override
    public String uploadSummernoteImg(MultipartFile file) {
        Map<String, String> map = new HashMap<String, String>();

        String originalFileName = file.getOriginalFilename();    //오리지날 파일명

        String uuid = UUID.randomUUID().toString();
        String extension = originalFileName.substring(originalFileName.lastIndexOf("."));
        String tempFileName = uuid + extension;

        Path uploadPath = Paths.get(filePath + "/summernote/" + tempFileName);

        File f = new File(filePath + "/summernote");

        if (!f.exists()) {
            f.mkdirs();
        }
        try {
            Files.write(uploadPath, file.getBytes());
        } catch (IOException e) {

            throw new RuntimeException(e);
        }


        return tempFileName;
    }

    @Override
    public Map<String, String> uploadBoardImg(MultipartFile file, String tempName) {
        Map<String, String> map = new HashMap<String, String>();
        String originName = file.getOriginalFilename();

        Path uploadPath = Paths.get(filePath + "/board/" + tempName);

        File f = new File(filePath + "/board");

        if (!f.exists()) {
            f.mkdirs();
        }
        try {
            Files.write(uploadPath, file.getBytes());
        } catch (IOException e) {

            throw new RuntimeException(e);
        }
        map.put("originName", originName);
        map.put("tempName", tempName);

        return map;
    }

    @Override
    public boolean deleteSummernoteImg(String tempName) {
        Path uploadPath = Paths.get(filePath + "/summernote/" + tempName);
        File file = new File(uploadPath.toUri());
        if (file.exists()) {
            file.delete();
        }

        return true;
    }

    @Override
    public boolean saveBoard(WriteReqDto writeReqDto) throws Exception {

        int result = 0;
        if (writeReqDto != null) {
            Board board = writeReqDto.toBoardEntity();
            result = boardRepository.saveBoard(board);

            List<BoardImgFile> files = new ArrayList<BoardImgFile>();

            if(writeReqDto.getImg() != null) {
                writeReqDto.getImg().forEach(img -> {
                    for(int i = 0; i < writeReqDto.getTempName().size(); i++) {
                        if(writeReqDto.getTempName().get(i).equals(img)) {
                            Map<String, String> map = new HashMap<String, String>();
                            map = uploadBoardImg(writeReqDto.getFiles().get(i), writeReqDto.getTempName().get(i));
                            files.add(BoardImgFile.builder()
                                    .board_id(board.getId())
                                    .origin_name(map.get("originName"))
                                    .temp_name(map.get("tempName"))
                                    .build());
                        }
                        deleteSummernoteImg(writeReqDto.getTempName().get(i));
                    }

                });
            }


            boardRepository.saveBoardImg(files);
        }
        return true;
    }

    @Override
    public List<BoardRespDto> loadBoard(int page,
                                        int menuId,
                                        int categoryId,
                                        String subcategoryId,
                                        String showList,
                                        String searchValue) throws Exception {
        Map<String, Object> map = new HashMap<String, Object>();
        map.put("page", (page - 1) * 10);
        map.put("menu_id", menuId);
        map.put("category_id", categoryId);
        map.put("subcategory_id", Integer.parseInt(subcategoryId));
        map.put("show_list", showList);
        map.put("searchValue", searchValue);

        List<BoardRespDto> result = new ArrayList<BoardRespDto>();



        boardRepository.loadBoard(map).forEach(list -> {
            result.add(list.toBoardRespDto());
        });

        return result;
    }

    @Override
    public boolean viewCount(int id) throws Exception {

        return boardRepository.viewCount(id) > 0 ? true : false;
    }

    @Override
    public ArticleRespDto loadArticle(int id) throws Exception {
        ArticleRespDto result = boardRepository.loadArticle(id).toRespDto();


        return result;
    }

    @Override
    public boolean likeAdd(int id ,int userId) throws Exception {
        Map<String, Integer> map = new HashMap<String, Integer>();
        map.put("id", id);
        map.put("from_id", userId);

        return boardRepository.likeAdd(map) > 0 ? true : false;
    }

    @Override
    public boolean likeRemove(int id ) throws Exception {
        return boardRepository.likeRemove(id) > 0 ? true : false;
    }

    @Override
    public boolean commentWrite(int id, int userId, String textValue) throws Exception {
        Map<String, Object> map = new HashMap<String, Object>();
        map.put("id", id);
        map.put("user_id", userId);
        map.put("text_value", textValue);



        return boardRepository.commentWrite(map) > 0 ? true : false;
    }

    @Override
    public boolean recommentWrite(int commentId, int userId, String textValue) throws Exception {
        Map<String, Object> map = new HashMap<String, Object>();
        map.put("comment_id", commentId);
        map.put("user_id", userId);
        map.put("text_value", textValue);

        return boardRepository.recommentWrite(map) > 0 ? true : false;
    }

    @Override
    public boolean commentDelete(int id) throws Exception {
        return boardRepository.commentDelete(id) > 0 ? true : false;
    }

    @Override
    public boolean recommentDelete(int id) throws Exception {
        return boardRepository.recommentDelete(id) > 0 ? true : false;
    }

    @Override
    public UpdateArticleRespDto loadUpdateArticle(int id) throws Exception {


        return boardRepository.loadUpdateArticle(id).toDto();
    }

    @Override
    public boolean updateArticle(UpdateReqDto updateReqDto) throws Exception {
        int result = 0;

        result = boardRepository.updateArticle(UpdateArticle.builder()
                        .id(updateReqDto.getId())
                        .category_id(Integer.parseInt(updateReqDto.getCategory()))
                        .subcategory_id(Integer.parseInt(updateReqDto.getSubcategory()))
                        .title(updateReqDto.getTitle())
                        .content(updateReqDto.getContent())
                        .build());
        List<BoardImgFile> files = new ArrayList<BoardImgFile>();

        if(result > 0) {
            if(updateReqDto.getImg() != null){
                updateReqDto.getImg().forEach(img -> {
                    if(updateReqDto.getTempName() != null) {
                        for (int i = 0; i < updateReqDto.getTempName().size(); i++) {
                            if (updateReqDto.getTempName().get(i).equals(img)) {
                                Map<String, String> map = new HashMap<String, String>();
                                map = uploadBoardImg(updateReqDto.getFiles().get(i), updateReqDto.getTempName().get(i));
                                files.add(BoardImgFile.builder()
                                        .board_id(updateReqDto.getId())
                                        .origin_name(map.get("originName"))
                                        .temp_name(map.get("tempName"))
                                        .build());
                                try {
                                    boardRepository.saveBoardImg(files);
                                } catch (Exception e) {
                                    throw new RuntimeException(e);
                                }
                            }
                            deleteSummernoteImg(updateReqDto.getTempName().get(i));
                        }
                    }
                });
            }

            if(updateReqDto.getDeleteImg() != null) {
                updateReqDto.getDeleteImg().forEach(img -> {
                    try {
                        boardRepository.deleteImg(img);
                    } catch (Exception e) {
                        throw new RuntimeException(e);
                    }
                    Path uploadPath = Paths.get(filePath + "/board/" + img);

                    File file = new File(uploadPath.toUri());
                    if(file.exists()) {
                        file.delete();
                    }
                });
            }

            return true;
        }
            return false;

    }
    @Override
    public boolean updateCancel(UpdateCancelReqDto updateCancelDto) throws Exception {
        if(updateCancelDto.getTempName() != null){
            updateCancelDto.getTempName().forEach(img -> {
                deleteSummernoteImg(img);
            });
        }


        return true;
    }

    @Override
    public boolean deleteArticle(ArticleDeleteReqDto articleDeleteReqDto) throws Exception {
        int id = articleDeleteReqDto.getId();

        if(boardRepository.deleteArticle(id) > 0) {
            if(articleDeleteReqDto.getImg() != null) {
                articleDeleteReqDto.getImg().forEach(img -> {
                    Path uploadPath = Paths.get(filePath + "/board/" + img);

                    File file = new File(uploadPath.toUri());
                    if(file.exists()) {
                        file.delete();
                    }
                });
            }

            if(articleDeleteReqDto.getDeleteImg() != null) {
                articleDeleteReqDto.getDeleteImg().forEach(img -> {
                    Path uploadPath = Paths.get(filePath + "/board/" + img);

                    File file = new File(uploadPath.toUri());
                    if(file.exists()) {
                        file.delete();
                    }
                });
            }

            if(articleDeleteReqDto.getTempName() != null) {
                articleDeleteReqDto.getTempName().forEach(tempName -> {
                    deleteSummernoteImg(tempName);
                });
            }

            return true;
        }
        return false;
    }
}
