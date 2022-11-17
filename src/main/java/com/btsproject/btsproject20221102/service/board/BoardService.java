package com.btsproject.btsproject20221102.service.board;

import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;

import java.io.File;
import java.io.IOException;
import java.nio.file.Files;
import java.nio.file.Path;
import java.nio.file.Paths;
import java.util.UUID;

@Service
public class BoardService {

    @Value("${file.path}")
    private String filePath;

    public String uploadImgService(MultipartFile file) {

        String originalFileName = file.getOriginalFilename();    //오리지날 파일명
        String extension = originalFileName.substring(originalFileName.lastIndexOf("."));    //파일 확장자
        String tempFileName = UUID.randomUUID() + extension;    //저장될 파일 명

        Path uploadPath = Paths.get(filePath + "/board/" + tempFileName);

        File f = new File(filePath + "/board");

        if (!f.exists()) {
            f.mkdirs();
        }
        String response;
        try {
            Files.write(uploadPath, file.getBytes());
            response = "/board/" + tempFileName;
        } catch (IOException e) {

            throw new RuntimeException(e);
        }
        return response;
    }

}
