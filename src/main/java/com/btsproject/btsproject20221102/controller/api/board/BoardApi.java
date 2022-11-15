package com.btsproject.btsproject20221102.controller.api.board;


import com.btsproject.btsproject20221102.dto.board.WriteReqDto;
import lombok.extern.slf4j.Slf4j;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@Slf4j
@RequestMapping("/api")
@RestController
public class BoardApi {

    @PostMapping("/write")
    public ResponseEntity<?> writeApi(WriteReqDto writeReqDto) {
        log.info("{}", writeReqDto);
        log.info("{}", writeReqDto.getFile().get(0));

        return ResponseEntity.ok().body(writeReqDto);
    }
}
