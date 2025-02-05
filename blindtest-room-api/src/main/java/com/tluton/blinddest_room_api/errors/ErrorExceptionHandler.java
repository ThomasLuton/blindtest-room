package com.tluton.blinddest_room_api.errors;

import org.springframework.http.HttpHeaders;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.ExceptionHandler;
import org.springframework.web.bind.annotation.RestControllerAdvice;
import org.springframework.web.servlet.mvc.method.annotation.ResponseEntityExceptionHandler;

@RestControllerAdvice
public class ErrorExceptionHandler extends ResponseEntityExceptionHandler {

    @ExceptionHandler(value = BusinessError.class)
   protected ResponseEntity<Object> handleBusinessError(BusinessError ex){
        return handleExceptionInternal(ex, ex.getErrorMessage(), new HttpHeaders(), ex.getStatus(), null);
    }

}
