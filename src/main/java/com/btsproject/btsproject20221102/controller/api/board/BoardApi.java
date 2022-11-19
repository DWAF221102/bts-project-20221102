package com.btsproject.btsproject20221102.controller.api.board;


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

import java.io.File;
import java.io.IOException;
import java.io.InputStream;
import java.nio.file.Files;
import java.nio.file.Path;
import java.nio.file.Paths;
import java.util.UUID;

@Slf4j
@RequestMapping("/api")
@RestController
@RequiredArgsConstructor
public class BoardApi {

    @Value("${file.path}")
    private String filePath;

    private final BoardService boardService;

    @PostMapping("/write")
    public ResponseEntity<?> writeApi(WriteReqDto writeReqDto) {
        log.info("{}", writeReqDto);
        //log.info("{}", writeReqDto.getFile().get(0));

        return ResponseEntity.ok().body(writeReqDto);
    }

    @PostMapping("/uploadimg")
    public String uploadImg(@RequestParam("file") MultipartFile file) {


        return boardService.uploadImgService(file);
    }
}
