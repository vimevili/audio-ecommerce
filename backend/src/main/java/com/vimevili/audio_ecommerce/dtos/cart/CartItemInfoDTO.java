package com.vimevili.audio_ecommerce.dtos.cart;

import java.util.UUID;

public record CartItemInfoDTO(
        UUID productId,
        String productName,
        String productPicture,
        Double unitPrice,
        Integer quantity,
        Double totalPrice
){}
