package com.vimevili.audio_ecommerce.exceptions;

public class UserNotAuthorizedException extends RuntimeException {
    public UserNotAuthorizedException() {
        super("Either the username or password you are trying to log in with are incorrect");
    }
}