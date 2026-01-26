package com.vimevili.audio_ecommerce.dtos.user;

import com.vimevili.audio_ecommerce.enums.UserRole;

import jakarta.validation.constraints.Email;
import jakarta.validation.constraints.NotBlank;

public record RegisterDTO(@NotBlank String name,
    @NotBlank String username,
    @NotBlank String password,
    @NotBlank @Email String email,
    UserRole role) {
}
