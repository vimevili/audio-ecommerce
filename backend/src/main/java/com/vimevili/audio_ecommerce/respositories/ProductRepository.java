package com.vimevili.audio_ecommerce.respositories;

import com.vimevili.audio_ecommerce.dtos.product.ProductInfoDTO;
import com.vimevili.audio_ecommerce.models.ProductModel;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

import java.util.Optional;
import java.util.UUID;

public interface ProductRepository extends JpaRepository<ProductModel, UUID>, ProductRepositoryCustom {

    String BASE_QUERY = """
        SELECT new com.vimevili.audio_ecommerce.dtos.product.ProductInfoDTO(
            p.id, p.name, p.picture, p.description, p.category, p.price,
            COALESCE(AVG(r.rate), 0.0), COUNT(r)
        )
        FROM ProductModel p
        LEFT JOIN p.reviews r
    """;

    String GROUP_BY = " GROUP BY p.id, p.name, p.picture, p.description, p.category, p.price";

    @Query(BASE_QUERY + " WHERE p.id = :id" + GROUP_BY)
    Optional<ProductInfoDTO> findByIdAsDTO(UUID id);
}
