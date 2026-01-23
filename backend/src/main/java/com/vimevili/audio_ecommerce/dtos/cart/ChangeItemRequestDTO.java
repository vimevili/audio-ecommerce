package com.vimevili.audio_ecommerce.dtos.cart;

public record ChangeItemRequestDTO(
        String cart_id,
        String product_id,
        Integer quantity
){}
