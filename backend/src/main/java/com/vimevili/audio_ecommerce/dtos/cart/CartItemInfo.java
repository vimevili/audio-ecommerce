package com.vimevili.audio_ecommerce.dtos.cart;

import com.vimevili.audio_ecommerce.models.CartItemModel;
import com.vimevili.audio_ecommerce.models.UserModel;

import java.util.Set;
import java.util.UUID;

public record CartItemInfo(
        UUID productId,
        String productName,
        Integer quantity,
        Double totalPrice
){}
