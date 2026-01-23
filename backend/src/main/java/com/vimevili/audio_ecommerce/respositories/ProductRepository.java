package com.vimevili.audio_ecommerce.respositories;

import com.vimevili.audio_ecommerce.dtos.product.ProductInfo;
import com.vimevili.audio_ecommerce.enums.ProductCategory;
import com.vimevili.audio_ecommerce.models.ProductModel;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import java.util.List;
import java.util.Optional;
import java.util.UUID;

public interface ProductRepository extends JpaRepository<ProductModel, UUID> {

    String BASE_QUERY = """
        SELECT new com.vimevili.audio_ecommerce.dtos.product.ProductInfo(
            p.id, p.name, p.picture, p.description, p.category, p.price,
            COALESCE(AVG(r.rate), 0.0), COUNT(r)
        )
        FROM ProductModel p
        LEFT JOIN p.reviews r
    """;

    String GROUP_BY = " GROUP BY p.id, p.name, p.picture, p.description, p.category, p.price";

    @Query(BASE_QUERY + GROUP_BY)
    List<ProductInfo> findAllAsDTO();

    @Query(BASE_QUERY + " WHERE p.id = :id" + GROUP_BY)
    Optional<ProductInfo> findByIdAsDTO(UUID id);

    @Query(BASE_QUERY + " WHERE p.category = :category" + GROUP_BY)
    List<ProductInfo>findByCategory(ProductCategory category);

    @Query(BASE_QUERY + " WHERE LOWER(p.name) LIKE LOWER(CONCAT('%', :searchTerm, '%'))" + GROUP_BY)
    List<ProductInfo> searchByName(@Param("searchTerm") String searchTerm);
}
