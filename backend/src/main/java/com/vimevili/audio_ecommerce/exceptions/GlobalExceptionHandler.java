package com.vimevili.audio_ecommerce.exceptions;

import com.vimevili.audio_ecommerce.dtos.errors.StandardErrorInfo;
import jakarta.servlet.http.HttpServletRequest;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.MethodArgumentNotValidException;
import org.springframework.web.bind.annotation.ControllerAdvice;
import org.springframework.web.bind.annotation.ExceptionHandler;
import org.springframework.web.method.annotation.MethodArgumentTypeMismatchException;

import java.time.Instant;
import java.util.Arrays;

@ControllerAdvice
public class GlobalExceptionHandler {

    @ExceptionHandler(ResourceNotFoundException.class)
    public ResponseEntity<StandardErrorInfo> handleNotFound(ResourceNotFoundException ex, HttpServletRequest request) {
        return buildErrorResponse(HttpStatus.NOT_FOUND, "Resource not found", ex.getMessage(), request);
    }

    @ExceptionHandler(UserAlreadyExistsException.class)
    public ResponseEntity<StandardErrorInfo> handleConflict(UserAlreadyExistsException ex, HttpServletRequest request) {
        return buildErrorResponse(HttpStatus.CONFLICT, "Conflict", ex.getMessage(), request);
    }
    
    @ExceptionHandler(UserNotAuthorizedException.class)
    public ResponseEntity<StandardErrorInfo> handleUnauthorized(UserNotAuthorizedException ex, HttpServletRequest request) {
        return buildErrorResponse(HttpStatus.UNAUTHORIZED, "Unauthorized", ex.getMessage(), request);
    }

    @ExceptionHandler(MethodArgumentNotValidException.class)
    public ResponseEntity<StandardErrorInfo> handleValidation(MethodArgumentNotValidException ex, HttpServletRequest request) {
        String msg = "Validation error: check the fields.";
        if (ex.getBindingResult().hasErrors()) {
            msg = ex.getBindingResult().getAllErrors().get(0).getDefaultMessage();
        }
        return buildErrorResponse(HttpStatus.BAD_REQUEST, "Validation Error", msg, request);
    }

    private ResponseEntity<StandardErrorInfo> buildErrorResponse(HttpStatus status, String error, String message, HttpServletRequest request) {
        StandardErrorInfo err = new StandardErrorInfo(
                Instant.now(),
                status,
                error,
                message,
                request.getRequestURI()
        );
        return ResponseEntity.status(status).body(err);
    }

    @ExceptionHandler(MethodArgumentTypeMismatchException.class)
    public ResponseEntity<StandardErrorInfo> handleTypeMismatch(MethodArgumentTypeMismatchException ex, HttpServletRequest request) {
        String message = "Invalid parameter value.";
        
        if (ex.getRequiredType() != null && ex.getRequiredType().isEnum()) {
            String allowedValues = Arrays.toString(ex.getRequiredType().getEnumConstants());
            message = String.format("Invalid value '%s'. Allowed values are: %s", ex.getValue(), allowedValues);
        }

        return buildErrorResponse(HttpStatus.BAD_REQUEST, "Invalid Parameter", message, request);
    }
}