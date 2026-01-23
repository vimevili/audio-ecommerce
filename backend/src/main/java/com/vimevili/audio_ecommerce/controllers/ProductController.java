package com.vimevili.audio_ecommerce.controllers;

import com.vimevili.audio_ecommerce.dtos.product.ProductInfoDTO;
import com.vimevili.audio_ecommerce.services.ProductService;
import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.media.Content;
import io.swagger.v3.oas.annotations.responses.ApiResponse;
import io.swagger.v3.oas.annotations.security.SecurityRequirement;
import io.swagger.v3.oas.annotations.tags.Tag;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.Set;
import java.util.UUID;

@RestController
@RequestMapping("/api/products")
@Tag(name = "Products", description = "Endpoints for basic Product operations (search, get by id, get by category)")
public class ProductController {

    @Autowired
    private ProductService productService;

    @GetMapping("/id/{productId}")
    @ApiResponse(responseCode = "200", content = @Content)
    @ApiResponse(responseCode = "500", description = "Internal Server Error", content = @Content)
    @Operation(summary = "Return a product matching the ID", security = @SecurityRequirement(name = "bearer-key"))
    public ResponseEntity<ProductInfoDTO> getProductById(@PathVariable UUID productId) {
        ProductInfoDTO ProductInfo = productService.findById(productId);
        return ResponseEntity.ok(ProductInfo);
    }

    @GetMapping("/category/{productCategory}")
    @ApiResponse(responseCode = "200", content = @Content)
    @ApiResponse(responseCode = "500", description = "Internal Server Error", content = @Content)
    @Operation(summary = "Return a product collection matching the category", security = @SecurityRequirement(name = "bearer-key"))
    public ResponseEntity<Set<ProductInfoDTO>> getProductByCategory(@PathVariable String productCategory) {
        Set<ProductInfoDTO> products = productService.findByCategory(productCategory);
        return ResponseEntity.ok(products);
    }

    @GetMapping("/search")
    @ApiResponse(responseCode = "200", content = @Content)
    @ApiResponse(responseCode = "500", description = "Internal Server Error", content = @Content)
    @Operation(summary = "Return a product collection matching the search query", security = @SecurityRequirement(name = "bearer-key"))
    public ResponseEntity<Set<ProductInfoDTO>> searchProducts(@RequestParam("name") String name) {
        if (name == null || name.trim().isEmpty()) {
            return ResponseEntity.ok(Set.of());
        }

        Set<ProductInfoDTO> results = productService.search(name);
        return ResponseEntity.ok(results);
    }

}