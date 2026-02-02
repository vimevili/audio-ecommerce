package com.vimevili.audio_ecommerce.respositories;

import java.util.List;

import org.springframework.stereotype.Repository;

import com.vimevili.audio_ecommerce.dtos.product.ProductInfoDTO;
import com.vimevili.audio_ecommerce.enums.ProductCategory;
import com.vimevili.audio_ecommerce.enums.ProductSortField;

import jakarta.persistence.EntityManager;
import jakarta.persistence.PersistenceContext;
import jakarta.persistence.TypedQuery;

@Repository
public class ProductRepositoryImpl implements ProductRepositoryCustom {

    @PersistenceContext
    private EntityManager entityManager;

    @Override
    public List<ProductInfoDTO> findProducts(ProductCategory category, String search, ProductSortField sortBy, String sortDir) {
        StringBuilder jpql = new StringBuilder("""
            SELECT new com.vimevili.audio_ecommerce.dtos.product.ProductInfoDTO(
                p.id, p.name, p.picture, p.description, p.category, p.price,
                COALESCE(AVG(r.rate), 0.0), COUNT(r)
            )
            FROM ProductModel p
            LEFT JOIN p.reviews r
            WHERE 1=1
        """);

        if (category != null) {
            jpql.append(" AND p.category = :category");
        }
        if (search != null && !search.isBlank()) {
            jpql.append(" AND LOWER(p.name) LIKE LOWER(CONCAT('%', :search, '%'))");
        }

        jpql.append(" GROUP BY p.id, p.name, p.picture, p.description, p.category, p.price");

        if (sortBy != null) {
            String direction = "desc".equalsIgnoreCase(sortDir) ? "DESC" : "ASC";
            jpql.append(" ORDER BY ").append(sortBy.getField()).append(" ").append(direction);
        } else {
            jpql.append(" ORDER BY p.name ASC");
        }

        TypedQuery<ProductInfoDTO> query = entityManager.createQuery(jpql.toString(), ProductInfoDTO.class);

        if (category != null) {
            query.setParameter("category", category);
        }
        if (search != null && !search.isBlank()) {
            query.setParameter("search", search);
        }

        return query.getResultList();
    }
}
