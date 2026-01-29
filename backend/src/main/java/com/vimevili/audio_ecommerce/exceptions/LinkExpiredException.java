package com.vimevili.audio_ecommerce.exceptions;

public class LinkExpiredException extends RuntimeException {
    public LinkExpiredException(String message) {
        super(message);
    }
}