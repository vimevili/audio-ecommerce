package com.vimevili.audio_ecommerce.services;

import com.vimevili.audio_ecommerce.dtos.product.ProductInfo;
import com.vimevili.audio_ecommerce.enums.ProductCategory;
import com.vimevili.audio_ecommerce.respositories.ProductRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.HashSet;
import java.util.List;
import java.util.Set;
import java.util.UUID;


@Service
public class ProductService {
    @Autowired
    private ProductRepository productRepository;

    public Set<ProductInfo> findAll() {
        List<ProductInfo> products = productRepository.findAllAsDTO();

        return new HashSet<ProductInfo>(products);
    }

    public ProductInfo findById(UUID id) {
        return productRepository.findByIdAsDTO(id);
    }

    public Set<ProductInfo> findByCategory(String productCategory) {

        List<ProductInfo> products = productRepository.findByCategory(ProductCategory.valueOf(productCategory));

        return new HashSet<ProductInfo>(products);

    }

    public Set<ProductInfo> search(String param) {

        List<ProductInfo> products = productRepository.searchByName(param);

        return new HashSet<ProductInfo>(products);

    }
}
