package com.example.ml4t_spring_backend.exception;

import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.ResponseStatus;

@ResponseStatus(HttpStatus.CONFLICT)
public class EmailTakenException extends IllegalStateException{
    public EmailTakenException(String message){super(message);}
}
