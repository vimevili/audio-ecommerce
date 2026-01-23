package com.vimevili.audio_ecommerce.controllers;

import com.vimevili.audio_ecommerce.dtos.product.ProductInfoDTO;
import com.vimevili.audio_ecommerce.services.ProductService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.Set;
import java.util.UUID;

@RestController
@RequestMapping("/api/products")
public class ProductController {

    @Autowired
    private ProductService productService;

    @GetMapping("/id/{productId}")
    public ResponseEntity<ProductInfoDTO> getProductById(@PathVariable UUID productId) {
        ProductInfoDTO ProductInfo = productService.findById(productId);
        return ResponseEntity.ok(ProductInfo);
    }

    @GetMapping("/category/{productCategory}")
    public ResponseEntity<Set<ProductInfoDTO>> getProductByCategory(@PathVariable String productCategory) {
        Set<ProductInfoDTO> products = productService.findByCategory(productCategory);
        return ResponseEntity.ok(products);
    }

    @GetMapping("/search")
    public ResponseEntity<Set<ProductInfoDTO>> searchProducts(@RequestParam("name") String name) {
        if (name == null || name.trim().isEmpty()) {
            return ResponseEntity.ok(Set.of());
        }

        Set<ProductInfoDTO> results = productService.search(name);
        return ResponseEntity.ok(results);
    }

}