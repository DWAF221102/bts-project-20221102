package com.btsproject.btsproject20221102.exception;

public class CustomInternalServerErrorException extends RuntimeException{

    public CustomInternalServerErrorException(String message) {
        super(message);
    }
}
