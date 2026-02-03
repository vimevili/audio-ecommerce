package com.vimevili.audio_ecommerce.respositories;

import com.vimevili.audio_ecommerce.dtos.product.ReviewDTO;
import com.vimevili.audio_ecommerce.models.ReviewModel;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

import java.util.List;
import java.util.UUID;

public interface ReviewRepository extends JpaRepository<ReviewModel, UUID> {

    @Query("""
        SELECT new com.vimevili.audio_ecommerce.dtos.product.ReviewDTO(
            r.id, r.user.id, r.user.name, r.user.picture, r.rate, r.content
        )
        FROM ReviewModel r
        WHERE r.product.id = :productId
        ORDER BY r.id DESC
    """)
    List<ReviewDTO> findByProductIdAsDTO(UUID productId);
}
