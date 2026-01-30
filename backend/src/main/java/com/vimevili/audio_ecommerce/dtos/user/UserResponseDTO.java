package com.vimevili.audio_ecommerce.dtos.user;

import com.vimevili.audio_ecommerce.enums.UserRole;

import io.swagger.v3.oas.annotations.media.Schema;

public record UserResponseDTO( 
    @Schema(description = "Username of the user", example = "johndoe")
    String username,
    @Schema(description = "Email of the user", example = "johndoe@example.com")
    String email,
    @Schema(description = "Role of the user", allowableValues = {"USER", "ADMIN"})
    UserRole role
) {
}
