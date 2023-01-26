package com.btsproject.btsproject20221102.service.board;

import com.btsproject.btsproject20221102.domain.LoadQnaResult;
import com.btsproject.btsproject20221102.domain.QnaAnswerInfo;
import com.btsproject.btsproject20221102.domain.QnaImgFile;
import com.btsproject.btsproject20221102.dto.board.*;
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
public class QnaBoardServiceImpl implements QnaBoardService{

    @Value("${file.path}")
    private String filePath;

    private final QnaRepository qnaRepository;

    @Override
    public QnaImgFile qnaUploadImgService(MultipartFile file) {
        String originalFileName = file.getOriginalFilename();    //오리지날 파일명
        String extension = originalFileName.substring(originalFileName.lastIndexOf("."));    //파일 확장자
        String tempFileName = UUID.randomUUID() + extension;    //저장될 파일 명

        QnaImgFile imgFiles = new QnaImgFile();

        Path uploadPath = Paths.get(filePath + "/board/" + tempFileName);
        //board 대시 어떤거 넣어야 되는지 나중에 확인

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
    public boolean saveQnaBoard(QnaCreateReqDto qnaCreateReqDto) throws Exception {
        return false;
    }

    @Override
    public boolean deleteImg(MultipartFile file) {
        String tempName = file.getOriginalFilename();

        return false;
    }

    @Override
    public List<QnaBoardRespDto> loadQnaBoard(int page,
                                              int categoryId,
                                              String subcategoryId,
                                              String statusId,
                                              String showList,
                                              String searchValue) throws Exception {
        Map<String, Object> map = new HashMap<String, Object>();
        map.put("page", (page - 1) * 10);
//        map.put("menu_id", menuId);

        map.put("category_id", categoryId);
        map.put("subcategory_id", Integer.parseInt(subcategoryId));
        map.put("status_id", Integer.parseInt(statusId));
        map.put("show_list", showList);
        map.put("searchValue", searchValue);

        List<QnaBoardRespDto> result = new ArrayList<QnaBoardRespDto>();



        qnaRepository.qnaLoadBoard(map).forEach(list -> {
            result.add(list.toQnaBoardRespDto());
        });

        return result;
    }

    // Q&A 질문자 모달
    @Override
    public boolean questionerModal(QnaQuestionerModalReqDto qnaQuestionerModalReqDto) throws Exception {
        qnaRepository.questionerModal(qnaQuestionerModalReqDto.toQuestionerModal());
        log.info("게시판 ID: " + qnaQuestionerModalReqDto.getBoardId());
        log.info("점수: " + qnaQuestionerModalReqDto.getScore());
        return true;
    }

    // Q&A 답변자 모달
    @Override
    public boolean answererModal(QnaAnswerModalReqDto qnaAnswerModalReqDto) throws Exception {
        qnaRepository.answererModal(qnaAnswerModalReqDto.toAnswererModal());
        log.info("서비스 ID: " + qnaAnswerModalReqDto.getId());
        log.info("서비스 원인 분석: " + qnaAnswerModalReqDto.getCauserAnalysis());
        log.info("서비스 해결 방안: " + qnaAnswerModalReqDto.getSolutionPlan());
        return true;
    }





}
