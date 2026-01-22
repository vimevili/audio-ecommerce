package com.vimevili.audio_ecommerce.respositories;

import com.vimevili.audio_ecommerce.models.CartModel;
import com.vimevili.audio_ecommerce.models.ReviewModel;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.UUID;

public interface ReviewRepository extends JpaRepository<ReviewModel, UUID> {
}
