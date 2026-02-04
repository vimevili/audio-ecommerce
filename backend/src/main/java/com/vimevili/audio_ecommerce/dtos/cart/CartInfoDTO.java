package com.vimevili.audio_ecommerce.dtos.cart;

import java.util.Set;
import java.util.UUID;

public record CartInfoDTO(
        UUID id,
        Double totalCartValue,
        Set<CartItemInfoDTO> products
){}
