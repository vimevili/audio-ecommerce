package com.vimevili.audio_ecommerce.dtos.cart;

public record AddToCartRequest(
        String cart_id,
        String product_id,
        Integer quantity
){}
