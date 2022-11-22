package com.btsproject.btsproject20221102.controller.api.board;


import com.btsproject.btsproject20221102.domain.BoardImgFile;
import com.btsproject.btsproject20221102.dto.board.WriteReqDto;
import com.btsproject.btsproject20221102.service.board.BoardService;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.multipart.MultipartFile;


@Slf4j
@RequestMapping("/api")
@RestController
@RequiredArgsConstructor
public class WriteApi {

    private final BoardService boardService;

    @PostMapping("/write")
    public ResponseEntity<?> writeApi(WriteReqDto writeReqDto) throws Exception {

//        String title = writeReqDto.getTitle();
//        for(int i = 0; i < 60; i++) {
//            writeReqDto.setTitle(title + "-" + (i + 1));
//            boardService.saveBoard(writeReqDto);
//        }

        boardService.saveBoard(writeReqDto);

        return ResponseEntity.ok().body(writeReqDto);
    }

    @PostMapping("/uploadimg")
    public BoardImgFile uploadImg(@RequestParam("file") MultipartFile file) {


        return boardService.uploadImgService(file);
    }
}
