package com.vimevili.audio_ecommerce.exceptions;

public class RateLimitException extends RuntimeException {
    public RateLimitException() {
        super("Too many requests. Please take a breather and try again in a few minutes.");
    }
}