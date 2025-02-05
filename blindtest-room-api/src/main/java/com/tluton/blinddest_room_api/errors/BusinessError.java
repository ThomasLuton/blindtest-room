package com.tluton.blinddest_room_api.errors;

import org.springframework.http.HttpStatus;

public class BusinessError extends RuntimeException{
    private final ErrorMessage errorMessage;
    private final HttpStatus status;

    public BusinessError(CodeError code, String msg,
                         HttpStatus status) {
        this.errorMessage = new ErrorMessage(code, msg);
        this.status = status;
    }

    public ErrorMessage getErrorMessage() {
        return errorMessage;
    }

    public HttpStatus getStatus() {
        return status;
    }
}
