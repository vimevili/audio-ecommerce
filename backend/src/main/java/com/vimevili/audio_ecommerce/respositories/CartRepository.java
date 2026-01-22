package com.vimevili.audio_ecommerce.respositories;

import com.vimevili.audio_ecommerce.models.CartModel;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.UUID;

public interface CartRepository extends JpaRepository<CartModel, UUID> {
}
