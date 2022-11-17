package com.btsproject.btsproject20221102.service.board;

import com.btsproject.btsproject20221102.aop.annotation.LogAspect;
import com.btsproject.btsproject20221102.domain.Board;
import com.btsproject.btsproject20221102.domain.BoardImgFile;
import com.btsproject.btsproject20221102.dto.board.WriteReqDto;
import com.btsproject.btsproject20221102.repository.board.BoardRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;

import java.io.File;
import java.io.IOException;
import java.nio.file.Files;
import java.nio.file.Path;
import java.nio.file.Paths;
import java.util.*;

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
    @LogAspect
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
}
