package com.vimevili.audio_ecommerce.dtos.product;

import com.vimevili.audio_ecommerce.enums.ProductCategory;
import io.swagger.v3.oas.annotations.media.Schema;

import java.util.List;
import java.util.UUID;

public record ProductDetailsDTO(
    @Schema(type = "string", description = "Unique identifier of the product")
    UUID id,

    @Schema(type = "string", description = "Name of the product")
    String name,

    @Schema(type = "string", description = "Picture URL of the product")
    String picture,

    @Schema(type = "string", description = "Description of the product")
    String description,
    
    @Schema(type = "string", allowableValues = {"Headphones", "Headsets"}, description = "Category of the product")
    ProductCategory category,

    @Schema(type = "number", format = "double", description = "Price of the product")
    Double price,

    @Schema(type = "number", format = "float", description = "Average rating of the product")
    Double averageRating,

    @Schema(type = "integer", format = "int64", description = "Total number of reviews for the product")
    Long totalReviews,

    @Schema(description = "List of reviews for this product")
    List<ReviewDTO> reviews
) {
    public static ProductDetailsDTO from(ProductInfoDTO info, List<ReviewDTO> reviews) {
        return new ProductDetailsDTO(
            info.id(),
            info.name(),
            info.picture(),
            info.description(),
            info.category(),
            info.price(),
            info.averageRating(),
            info.totalReviews(),
            reviews
        );
    }
}
