package com.vimevili.audio_ecommerce.services;

import com.vimevili.audio_ecommerce.dtos.product.ProductInfoDTO;
import com.vimevili.audio_ecommerce.enums.ProductCategory;
import com.vimevili.audio_ecommerce.exceptions.ResourceNotFoundException;
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

    public Set<ProductInfoDTO> findAll() {
        List<ProductInfoDTO> products = productRepository.findAllAsDTO();
        return new HashSet<ProductInfoDTO>(products);
    }

    public ProductInfoDTO findById(UUID id) {
        return productRepository.findByIdAsDTO(id).orElseThrow(() -> new ResourceNotFoundException("No product was found with this ID!"));
    }

    public Set<ProductInfoDTO> findByCategory(ProductCategory productCategory) {
        List<ProductInfoDTO> products = productRepository.findByCategory(productCategory);
        return new HashSet<ProductInfoDTO>(products);
    }

    public Set<ProductInfoDTO> search(String param) {
        List<ProductInfoDTO> products = productRepository.searchByName(param);
        return new HashSet<ProductInfoDTO>(products);

    }
}
