package com.vimevili.audio_ecommerce.exceptions;

public class AccountAlreadyActivatedException extends RuntimeException {
    public AccountAlreadyActivatedException() {
        super("This account is already activated!");
    }
}