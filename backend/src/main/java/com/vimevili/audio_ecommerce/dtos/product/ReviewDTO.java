package com.vimevili.audio_ecommerce.dtos.product;

import io.swagger.v3.oas.annotations.media.Schema;

import java.util.UUID;

public record ReviewDTO(
    @Schema(type = "string", description = "Unique identifier of the review")
    UUID id,

    @Schema(type = "string", description = "Unique identifier of the user")
    UUID userId,

    @Schema(type = "string", description = "Name of the user who wrote the review")
    String userName,

    @Schema(type = "string", description = "Picture URL of the user")
    String userPicture,

    @Schema(type = "number", format = "float", description = "Rating given by the user (1-5)")
    Float rate,

    @Schema(type = "string", description = "Review content/comment")
    String content
) {}
