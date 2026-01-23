package com.vimevili.audio_ecommerce.dtos.cart;

import com.vimevili.audio_ecommerce.models.CartItemModel;
import com.vimevili.audio_ecommerce.models.UserModel;

import java.util.Set;

public record CartRequest(
        String user_id
){}
