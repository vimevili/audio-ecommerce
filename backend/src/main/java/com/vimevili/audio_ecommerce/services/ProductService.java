package com.vimevili.audio_ecommerce.services;

import java.util.LinkedHashSet;
import java.util.List;
import java.util.Set;
import java.util.UUID;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.vimevili.audio_ecommerce.dtos.product.ProductDetailsDTO;
import com.vimevili.audio_ecommerce.dtos.product.ProductInfoDTO;
import com.vimevili.audio_ecommerce.dtos.product.ReviewDTO;
import com.vimevili.audio_ecommerce.enums.ProductCategory;
import com.vimevili.audio_ecommerce.enums.ProductSortField;
import com.vimevili.audio_ecommerce.exceptions.ResourceNotFoundException;
import com.vimevili.audio_ecommerce.respositories.ProductRepository;
import com.vimevili.audio_ecommerce.respositories.ReviewRepository;


@Service
public class ProductService {
    @Autowired
    private ProductRepository productRepository;

    @Autowired
    private ReviewRepository reviewRepository;

    public ProductDetailsDTO findById(UUID id) {
        ProductInfoDTO product = productRepository.findByIdAsDTO(id)
            .orElseThrow(() -> new ResourceNotFoundException("No product was found with this ID!"));
        
        List<ReviewDTO> reviews = reviewRepository.findByProductIdAsDTO(id);
        
        return ProductDetailsDTO.from(product, reviews);
    }

    public Set<ProductInfoDTO> findProducts(ProductCategory category, String search, ProductSortField sortBy, String sortDir) {
        List<ProductInfoDTO> products = productRepository.findProducts(category, search, sortBy, sortDir);
        return new LinkedHashSet<>(products); 
    }
}
