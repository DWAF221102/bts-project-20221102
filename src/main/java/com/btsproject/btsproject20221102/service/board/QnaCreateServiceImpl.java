package com.btsproject.btsproject20221102.service.board;

import com.btsproject.btsproject20221102.domain.*;
import com.btsproject.btsproject20221102.dto.board.*;
import com.btsproject.btsproject20221102.exception.CustomInternalServerErrorException;
import com.btsproject.btsproject20221102.repository.qna.QnaRepository;
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
public class QnaCreateServiceImpl implements QnaCreateService{

    @Value("${file.path}")
    private String filePath;
    
    private final QnaRepository qnaRepository;

    @Override
    public boolean qnaCreate(QnaCreateReqDto qnaCreateReqDto) throws Exception {
        int resultCount = 0;

        List<MultipartFile> files = qnaCreateReqDto.getFiles();
        List<QnaImgFile> qnaImgFiles = null;

        Qna qna = qnaCreateReqDto.toQnaEntity();
        resultCount = qnaRepository.saveQna(qna);

        if(files != null) {
            int boardId = qna.getId();
            qnaImgFiles = getQnaImgFiles(files, boardId);
            resultCount = qnaRepository.saveImgFiles(qnaImgFiles);
        }

        if(resultCount == 0) {
            throw new CustomInternalServerErrorException("상품 등록 실패");
        }

        return true;
    }

    private List<QnaImgFile> getQnaImgFiles(List<MultipartFile> files, int boardId) throws Exception {
        List<QnaImgFile> qnaImgFiles = new ArrayList<QnaImgFile>();
        log.info("boardId", boardId);


        files.forEach(file -> {
            String originName = file.getOriginalFilename();
            String extension = originName.substring(originName.lastIndexOf("."));
            String temp_name = UUID.randomUUID().toString() + extension;

            Path uploadPath = Paths.get(filePath + "/qna/" + temp_name);
            // 폴더 경로 맞는지 확인

            File f = new File(filePath + "/qna");
            if(!f.exists()){
                f.mkdirs();
            }

            try {
                Files.write(uploadPath, file.getBytes());
            } catch (IOException e) {
                throw new RuntimeException(e);
            }

            QnaImgFile qnaImgFile = QnaImgFile.builder()
                    .qna_board_id(boardId)
                    .origin_name(originName)
                    .temp_name(temp_name)
                    .build();

            qnaImgFiles.add(qnaImgFile);
        });

        return qnaImgFiles;
    }

//    @Override
//    public List<QnaCreateRespDto> getQnaList(int pageNumber, String category, String searchText, int id) throws Exception {
////        Map<String, Object> paramsMap = new HashMap<String, Object>();
////        paramsMap.put("index", (pageNumber - 1) * 10);
////
////        List<QnaCreateRespDto> qnaCreateListRespDto = new ArrayList<QnaCreateRespDto>();
////
//        qnaRepository.getQnaList(paramsMap).forEach(qna -> {
////            qnaCreateListRespDto.add(qna.toListRespDto());
////        });
////
////        return qnaCreateListRespDto;
//            List<QnaCreateRespDto> qnaCreateListRespDto = new ArrayList<QnaCreateRespDto>();
//            qnaRepository.getQnaList(id).forEach(qna -> {
//            qnaCreateListRespDto.add(qna.toListRespDto());
//            });
//
//            return qnaCreateListRespDto;
//    }

    @Override
    public QnaCreateRespDto getQnaArticle(int id) throws Exception {
        QnaArticle qnaArticle = qnaRepository.infoQna(id);
        System.out.println(qnaArticle);
        return qnaArticle.toQnaCreateRespDto();

    }

    @Override
    public QnaAnswerInfoRespDto getAnswerInfo(int id) throws Exception {
        QnaAnswerInfo qnaAnswerInfo = qnaRepository.getAnswerInfo(id);
        log.info("ID: " + qnaAnswerInfo.getId());
        log.info("답변자 닉네임: " + qnaAnswerInfo.getNickname());
        log.info("답변자 사진: " + qnaAnswerInfo.getUser_img());
        System.out.println(qnaAnswerInfo);
        return qnaAnswerInfo.toAnswerInfo();
    }

    @Override
    public boolean deleteQna(int id) throws Exception {
        List<QnaImgFile> qnaImgFiles = qnaRepository.getQnaImgList(id);
        if (qnaRepository.deleteQna(id) > 0) {
            qnaImgFiles.forEach(qnaImgFile -> {
                Path uploadPath = Paths.get(filePath + "/" + qnaImgFile.getTemp_name());

                File file = new File(uploadPath.toUri());
                if (file.exists()) {
                    file.delete();
                }
            });

            return true;
        }
        return false;
    }

    @Override
    public QnaUpdateRespDto loadQnaUpdate(int id) throws Exception {
        QnaUpdateArticle qnaUpdateArticle = qnaRepository.updateInfoQna(id);
        System.out.println(qnaUpdateArticle);
        System.out.println("동작");
        return qnaUpdateArticle.toQnaUpdateRespDto();
    }

    @Override
    public boolean qnaUpdateArticle(QnaUpdateReqDto qnaUpdateReqDto) throws Exception {
        int resultCount = 0;

        List<MultipartFile> files = qnaUpdateReqDto.getFiles();
        List<QnaImgFile> qnaImgFiles = null;

        Qna qna = qnaUpdateReqDto.toQnaEntity();
        resultCount = qnaRepository.saveQna(qna);

        if(files != null) {
            int boardId = qna.getId();
            qnaImgFiles = getQnaImgFiles(files, boardId);
            resultCount = qnaRepository.saveImgFiles(qnaImgFiles);
        }

        if(resultCount == 0) {
            throw new CustomInternalServerErrorException("상품 등록 실패");
        }

        return true;
    }

    @Override
    public boolean updateDeleteArticle(QnaDeleteReqDto qnaDeleteReqDto) throws Exception {
        int id = qnaDeleteReqDto.getId();
        qnaRepository.updateDelete(id);

        return false;
    }
}
