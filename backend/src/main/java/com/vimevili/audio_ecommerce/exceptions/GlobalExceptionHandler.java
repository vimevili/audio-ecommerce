package com.vimevili.audio_ecommerce.exceptions;

import java.time.Instant;
import java.util.Arrays;

import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.MethodArgumentNotValidException;
import org.springframework.web.bind.annotation.ExceptionHandler;
import org.springframework.web.bind.annotation.RestControllerAdvice;
import org.springframework.web.method.annotation.MethodArgumentTypeMismatchException;

import com.vimevili.audio_ecommerce.dtos.errors.StandardErrorInfo;

import jakarta.servlet.http.HttpServletRequest;

@RestControllerAdvice
public class GlobalExceptionHandler {

    @ExceptionHandler(AccountAlreadyActivatedException.class)
    public ResponseEntity<StandardErrorInfo> handleConflict(AccountAlreadyActivatedException ex, HttpServletRequest request) {
        return buildErrorResponse(HttpStatus.CONFLICT, "Account Already Activated", ex.getMessage(), request);
    }
    
    @ExceptionHandler(UserAlreadyExistsException.class)
    public ResponseEntity<StandardErrorInfo> handleConflict(UserAlreadyExistsException ex, HttpServletRequest request) {
        return buildErrorResponse(HttpStatus.CONFLICT, "Conflict", ex.getMessage(), request);
    }
    
    @ExceptionHandler(UserNotEnabledException.class)
    public ResponseEntity<StandardErrorInfo> handleConflict(UserNotEnabledException ex, HttpServletRequest request) {
        return buildErrorResponse(HttpStatus.FORBIDDEN, "Account Inactive", ex.getMessage(), request);
    }

    @ExceptionHandler(UserNotAuthorizedException.class)
    public ResponseEntity<StandardErrorInfo> handleUnauthorized(UserNotAuthorizedException ex, HttpServletRequest request) {
        return buildErrorResponse(HttpStatus.UNAUTHORIZED, "Unauthorized", ex.getMessage(), request);
    }

    @ExceptionHandler(ResourceNotFoundException.class)
    public ResponseEntity<StandardErrorInfo> handleNotFound(ResourceNotFoundException ex, HttpServletRequest request) {
        return buildErrorResponse(HttpStatus.NOT_FOUND, "Not Found", ex.getMessage(), request);
    }

    @ExceptionHandler(LinkExpiredException.class)
    public ResponseEntity<StandardErrorInfo> handleExpired(LinkExpiredException ex, HttpServletRequest request) {
        return buildErrorResponse(HttpStatus.GONE, "Link Expired", ex.getMessage(), request);
    }
    
    @ExceptionHandler(RateLimitException.class)
    public ResponseEntity<StandardErrorInfo> handleRateLimit(RateLimitException ex, HttpServletRequest request) {
        return buildErrorResponse(HttpStatus.TOO_MANY_REQUESTS, "Too Many Requests", ex.getMessage(), request);
    }

    @ExceptionHandler(MethodArgumentNotValidException.class)
    public ResponseEntity<StandardErrorInfo> handleValidation(MethodArgumentNotValidException ex, HttpServletRequest request) {
        String msg = "Validation error: check the fields.";
        if (ex.getBindingResult().hasErrors()) {
            msg = ex.getBindingResult().getAllErrors().get(0).getDefaultMessage();
        }
        return buildErrorResponse(HttpStatus.BAD_REQUEST, "Validation Error", msg, request);
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

    @ExceptionHandler(Exception.class)
    public ResponseEntity<StandardErrorInfo> handleGenericException(Exception ex, HttpServletRequest request) {
        ex.printStackTrace();
        
        String message = ex.getMessage();
        if (message == null || message.isBlank()) {
            message = "An unexpected error occurred.";
        }
        return buildErrorResponse(HttpStatus.INTERNAL_SERVER_ERROR, "Internal Server Error", message, request);
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
}