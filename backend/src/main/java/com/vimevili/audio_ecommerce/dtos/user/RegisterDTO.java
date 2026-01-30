package com.vimevili.audio_ecommerce.dtos.user;

import com.vimevili.audio_ecommerce.enums.UserRole;

import io.swagger.v3.oas.annotations.media.Schema;
import jakarta.validation.constraints.Email;
import jakarta.validation.constraints.NotBlank;

public record RegisterDTO(
    @Schema(description = "Name of the user", example = "John Doe")
    @NotBlank String name,
    @Schema(description = "Username of the user", example = "johndoe")
    @NotBlank String username,
    @Schema(description = "Password of the user", example = "password123")
    @NotBlank String password,
    @Schema(description = "Email of the user", example = "johndoe@example.com")
    @NotBlank @Email String email,
    @Schema(description = "Role of the user", allowableValues = {"USER", "ADMIN"})
    UserRole role) {
}
