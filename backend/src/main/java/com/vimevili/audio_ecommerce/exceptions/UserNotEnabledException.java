package com.vimevili.audio_ecommerce.exceptions;

public class UserNotEnabledException extends RuntimeException {
    public UserNotEnabledException() {
        super("This account is not activated!");
    }
}