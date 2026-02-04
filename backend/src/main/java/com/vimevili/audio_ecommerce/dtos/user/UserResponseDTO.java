package com.vimevili.audio_ecommerce.dtos.user;

import com.vimevili.audio_ecommerce.enums.UserRole;

import io.swagger.v3.oas.annotations.media.Schema;

import java.util.UUID;

public record UserResponseDTO( 
    @Schema(description = "ID of the user")
    UUID id,
    @Schema(description = "Name of the user", example = "John Doe")
    String name,
    @Schema(description = "Picture of the user")
    String picture,
    @Schema(description = "Username of the user", example = "johndoe")
    String username,
    @Schema(description = "Email of the user", example = "johndoe@example.com")
    String email,
    @Schema(description = "Role of the user", allowableValues = {"USER", "ADMIN"})
    UserRole role
) {
}
