package com.vimevili.audio_ecommerce.respositories;

import java.util.List;

import com.vimevili.audio_ecommerce.dtos.product.ProductInfoDTO;
import com.vimevili.audio_ecommerce.enums.ProductCategory;
import com.vimevili.audio_ecommerce.enums.ProductSortField;

public interface ProductRepositoryCustom {
    List<ProductInfoDTO> findProducts(ProductCategory category, String search, ProductSortField sortBy, String sortDir);
}
