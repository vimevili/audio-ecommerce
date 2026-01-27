package com.vimevili.audio_ecommerce.dtos.tokens;

import jakarta.validation.constraints.Email;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.Size;

public record ResetPasswordDTO(
        @NotBlank String token,
        @NotBlank @Size(min = 6, message = "Your password must be at least 6 characters long") String newPassword
) {}
