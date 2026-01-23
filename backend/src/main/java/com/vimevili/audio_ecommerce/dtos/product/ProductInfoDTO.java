package com.vimevili.audio_ecommerce.dtos.product;

import com.vimevili.audio_ecommerce.enums.ProductCategory;

import java.util.UUID;

public record ProductInfoDTO(
      UUID id,
      String name,
      String picture,
      String description,
      ProductCategory category,
      Double price,
      Double averageRating,
      Long totalReviews
){}
