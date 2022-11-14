package com.btsproject.btsproject20221102.handler;

import com.btsproject.btsproject20221102.dto.CMRespDto;
import com.btsproject.btsproject20221102.exception.CustomInternalServerErrorException;
import com.btsproject.btsproject20221102.exception.CustomValidationException;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.ExceptionHandler;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.bind.annotation.RestControllerAdvice;

@RestController
@RestControllerAdvice

public class RestControllerExceptionHandler {

    @ExceptionHandler(CustomValidationException.class)
    public ResponseEntity<?> validationErrorException(CustomValidationException e) {
        return ResponseEntity
                .badRequest()
                .body(new CMRespDto<>(-1, e.getMessage(), e.getErrorMap()));
    }

    @ExceptionHandler(CustomInternalServerErrorException.class)
    public ResponseEntity<?> internalErrorException(CustomInternalServerErrorException e) {
        return ResponseEntity
                .internalServerError()
                .body(new CMRespDto<>(-1, e.getMessage(), null));
    }
}
