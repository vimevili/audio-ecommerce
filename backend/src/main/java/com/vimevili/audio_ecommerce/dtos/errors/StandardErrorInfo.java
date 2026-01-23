package com.vimevili.audio_ecommerce.dtos.errors;

import java.time.Instant;

public record StandardErrorInfo(
        Instant timestamp,
        Integer status,
        String error,
        String message,
        String path
) {}