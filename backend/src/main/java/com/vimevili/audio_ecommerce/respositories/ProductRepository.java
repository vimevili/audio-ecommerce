package com.vimevili.audio_ecommerce.respositories;

import com.vimevili.audio_ecommerce.dtos.product.ProductInfo;
import com.vimevili.audio_ecommerce.enums.ProductCategory;
import com.vimevili.audio_ecommerce.models.ProductModel;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import java.util.List;
import java.util.UUID;

public interface ProductRepository extends JpaRepository<ProductModel, UUID> {

    String query = """
        SELECT new com.vimevili.audio_ecommerce.dtos.product.ProductInfo(
            p.id,
            p.name,
            p.picture,
            p.description,
            p.category,
            p.price,
            COALESCE(AVG(r.rate), 0.0),
            COUNT(r)
        )
        FROM ProductModel p
        LEFT JOIN p.reviews r
        GROUP BY p.id, p.name, p.picture, p.description, p.category, p.price
    """;

    @Query(query)
    List<ProductInfo> findAllAsDTO();

    @Query(query)
    ProductInfo findByIdAsDTO(UUID id);

    @Query(query)
    List<ProductInfo> findByCategory(ProductCategory category);

    @Query("""
    SELECT new com.vimevili.audio_ecommerce.dtos.product.ProductInfo(
        p.id, p.name, p.picture, p.description, p.category, p.price,
        COALESCE(AVG(r.rate), 0.0), COUNT(r)
    )
    FROM ProductModel p
    LEFT JOIN p.reviews r
    WHERE LOWER(p.name) LIKE LOWER(CONCAT('%', :searchTerm, '%'))
    GROUP BY p.id, p.name, p.picture, p.description, p.category, p.price
""")
    List<ProductInfo> searchByName(@Param("searchTerm") String searchTerm);
}
