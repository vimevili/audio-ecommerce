package com.vimevili.audio_ecommerce.dtos.errors;

import java.time.Instant;

import org.springframework.http.HttpStatus;

import io.swagger.v3.oas.annotations.media.Schema;

public record StandardErrorInfo(
        @Schema(example = "2026-01-28T10:00:00Z") Instant timestamp,
    @Schema(example = "404") HttpStatus status,
    @Schema(example = "Not Found") String error,
    @Schema(example = "Product not found with ID 123") String message,
    @Schema(example = "/api/products/123") String path
) {}