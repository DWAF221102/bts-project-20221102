package com.btsproject.btsproject20221102.service.board;

import com.btsproject.btsproject20221102.aop.annotation.LogAspect;
import com.btsproject.btsproject20221102.domain.Article;
import com.btsproject.btsproject20221102.domain.Board;
import com.btsproject.btsproject20221102.domain.BoardImgFile;
import com.btsproject.btsproject20221102.dto.board.ArticleRespDto;
import com.btsproject.btsproject20221102.dto.board.BoardRespDto;
import com.btsproject.btsproject20221102.dto.board.WriteReqDto;
import com.btsproject.btsproject20221102.repository.board.BoardRepository;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;

import java.io.File;
import java.io.IOException;
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
    public BoardImgFile uploadImgService(MultipartFile file) {

        String originalFileName = file.getOriginalFilename();    //오리지날 파일명
        String extension = originalFileName.substring(originalFileName.lastIndexOf("."));    //파일 확장자
        String tempFileName = UUID.randomUUID() + extension;    //저장될 파일 명

        BoardImgFile imgFiles = new BoardImgFile();

        Path uploadPath = Paths.get(filePath + "/board/" + tempFileName);

        File f = new File(filePath + "/board");

        if (!f.exists()) {
            f.mkdirs();
        }
        try {
            Files.write(uploadPath, file.getBytes());
            imgFiles.setOrigin_name(originalFileName);
            imgFiles.setTemp_name(tempFileName);
        } catch (IOException e) {

            throw new RuntimeException(e);
        }
        return imgFiles;
    }

    @Override
    public boolean deleteImg(MultipartFile file) {
        String tempName = file.getOriginalFilename();

        return false;
    }

    @Override
    public boolean saveBoard(WriteReqDto writeReqDto) throws Exception {
        int result = 0;

        Board board = writeReqDto.toBoardEntity();
        result = boardRepository.saveBoard(board);

        List<BoardImgFile> files = new ArrayList<BoardImgFile>();

        if(writeReqDto.getOriginFile() != null) {
            for(int i = 0; i < writeReqDto.getOriginFile().size(); i++) {
                files.add(BoardImgFile.builder()
                        .board_id(board.getId())
                        .origin_name(writeReqDto.getOriginFile().get(i))
                        .temp_name(writeReqDto.getTempFile().get(i))
                        .build());
            }
            result = boardRepository.saveBoardImg(files);
        }

        if(result == 0) {
            return false;
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
    public ArticleRespDto loadArticle(int id) throws Exception {
        ArticleRespDto result = boardRepository.loadArticle(id).toRespDto();

        log.info("Article >> {}", result);

        return result;
    }

    @Override
    public boolean likeAdd(int id ,int userId) throws Exception {
        Map<String, Integer> map = new HashMap<String, Integer>();
        map.put("id", id);
        map.put("from_id", userId);

        boolean result = boardRepository.likeAdd(map) != 0 ? true : false;
        log.info("result = {}", result);
        return result;
    }

    @Override
    public boolean likeRemove(int id ) throws Exception {
        boolean result = boardRepository.likeRemove(id) != 0 ? true : false;
        log.info("result = {}", result);
        return result;
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
}
