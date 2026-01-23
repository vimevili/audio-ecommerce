package com.vimevili.audio_ecommerce.respositories;

import com.vimevili.audio_ecommerce.models.CartModel;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import java.util.Optional;
import java.util.UUID;

public interface CartRepository extends JpaRepository<CartModel, UUID> {
    @Query("SELECT c FROM CartModel c LEFT JOIN FETCH c.products WHERE c.id = :id")
    Optional<CartModel> findByUserId(@Param("id") UUID id);

    @Query("""
       SELECT c FROM CartModel c\s
          LEFT JOIN FETCH c.products items
          LEFT JOIN FETCH items.product
          LEFT JOIN FETCH c.user
          WHERE c.id = :id
    """)
    Optional<CartModel> findByIdWithItems(@Param("id") UUID id);
}
