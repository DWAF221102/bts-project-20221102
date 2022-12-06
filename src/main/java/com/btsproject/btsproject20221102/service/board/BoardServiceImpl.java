package com.btsproject.btsproject20221102.service.board;

import com.btsproject.btsproject20221102.domain.Board;
import com.btsproject.btsproject20221102.domain.BoardImgFile;
import com.btsproject.btsproject20221102.dto.board.ArticleRespDto;
import com.btsproject.btsproject20221102.dto.board.BoardRespDto;
import com.btsproject.btsproject20221102.dto.board.UpdateArticleRespDto;
import com.btsproject.btsproject20221102.dto.board.WriteReqDto;
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
public class BoardServiceImpl implements BoardService{

    @Value("${file.path}")
    private String filePath;

    private final BoardRepository boardRepository;

    @Override
    public String uploadSummernoteService(MultipartFile file) {

        String originalFileName = file.getOriginalFilename();    //오리지날 파일명

        Path uploadPath = Paths.get(filePath + "/summernote/" + originalFileName);

        File f = new File(filePath + "/summernote");

        if (!f.exists()) {
            f.mkdirs();
        }
        try {
            Files.write(uploadPath, file.getBytes());
        } catch (IOException e) {

            throw new RuntimeException(e);
        }
        return originalFileName;
    }

    @Override
    public Map<String, List<String>> uploadImgService(List<String> img ,List<MultipartFile> imgfiles) {
        Map<String, List<String>> fileNames = new HashMap<String, List<String>>();
        List<String> originNames = new ArrayList<String>();
        List<String> tempNames = new ArrayList<String>();

        img.forEach(data -> {
            imgfiles.forEach(file -> {
                String originalFileName = file.getOriginalFilename();
                if(originalFileName.equals(data)) {
                    originNames.add(originalFileName);

                    String uuid = UUID.randomUUID().toString();
                    String extension = originalFileName.substring(originalFileName.lastIndexOf("."));
                    String tempFileName = uuid + extension;
                    tempNames.add(tempFileName);

                    Path uploadPath = Paths.get(filePath + "/board/" + tempFileName);

                    File f = new File(filePath + "/board");

                    if (!f.exists()) {
                        f.mkdirs();
                    }
                    try {
                        Files.write(uploadPath, file.getBytes());

                    } catch (IOException e) {
                        throw new RuntimeException(e);
                    }

                }
            });
        });

        fileNames.put("originNames", originNames);
        fileNames.put("tempNames", tempNames);
        return fileNames;
    }

    @Override
    public boolean deleteSummernoteImg(List<String> summernote) {
        if(summernote.size() != 0) {
            summernote.forEach(img -> {
                Path uploadPath = Paths.get(filePath + "/summnernot/" + img);
                log.info("img: " + img);
                File file = new File(uploadPath.toUri());
                if(file.exists()) {
                    file.delete();
                }
            });
            return true;
        }

        return false;
    }

    @Override
    public boolean saveBoard(WriteReqDto writeReqDto) throws Exception {

        int result = 0;
        if(writeReqDto != null) {
            Board board = writeReqDto.toBoardEntity();
            result = boardRepository.saveBoard(board);

            List<BoardImgFile> files = new ArrayList<BoardImgFile>();

            if(writeReqDto.getSummernote().size() != 0) {
                if(writeReqDto.getImg().size() != 0) {
                    Map<String, List<String>> map = uploadImgService(writeReqDto.getImg(), writeReqDto.getImgFiles());
                    if(map.size() != 0) {
                        for(int i = 0; i < map.get("originName").size(); i++) {
                            files.add(BoardImgFile.builder()
                                    .board_id(board.getId())
                                    .origin_name(map.get("originName").get(i))
                                    .temp_name(map.get("tempName").get(i))
                                    .build());
                        }
                        result = boardRepository.saveBoardImg(files);
                    }
                }
                deleteSummernoteImg(writeReqDto.getSummernote());

            }
            return true;
        }
        return false;
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
    public boolean deleteArticle(int id) throws Exception {
        List<BoardImgFile> boardImgFiles = boardRepository.getBoardImgList(id);

        if(boardRepository.deleteArticle(id) > 0) {
            boardImgFiles.forEach(productImgFile -> {
                Path uploadPath = Paths.get(filePath + "/board/" + productImgFile.getTemp_name());

                File file = new File(uploadPath.toUri());
                if(file.exists()) {
                    file.delete();
                }
            });
            return true;
        };
        return false;
    }

    @Override
    public UpdateArticleRespDto loadUpdateArticle(int id) throws Exception {


        return boardRepository.loadUpdateArticle(id).toDto();
    }
}
