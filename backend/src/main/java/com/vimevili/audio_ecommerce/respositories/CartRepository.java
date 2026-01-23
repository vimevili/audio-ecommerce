package com.vimevili.audio_ecommerce.respositories;

import com.vimevili.audio_ecommerce.models.CartModel;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import java.util.Optional;
import java.util.UUID;

public interface CartRepository extends JpaRepository<CartModel, UUID> {
    @Query("SELECT c FROM CartModel c " +
            "LEFT JOIN FETCH c.products p " +
            "LEFT JOIN FETCH p.product " +
            "WHERE c.user.id = :userId")
    Optional<CartModel> findByUserId(@Param("userId") UUID userId);
}
