package com.vimevili.audio_ecommerce.controllers;

import com.vimevili.audio_ecommerce.dtos.product.ProductInfoDTO;
import com.vimevili.audio_ecommerce.enums.ProductCategory;
import com.vimevili.audio_ecommerce.services.ProductService;
import com.vimevili.audio_ecommerce.infra.docs.ApiGlobalErrors;
import com.vimevili.audio_ecommerce.infra.docs.ApiNotFoundResponse;

import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.media.ArraySchema;
import io.swagger.v3.oas.annotations.media.Content;
import io.swagger.v3.oas.annotations.media.Schema;
import io.swagger.v3.oas.annotations.responses.ApiResponse;
import io.swagger.v3.oas.annotations.tags.Tag;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.Set;
import java.util.UUID;

@RestController
@RequestMapping("/api/products")
@Tag(name = "Products", description = "Endpoints for basic Product operations")
public class ProductController {

    @Autowired
    private ProductService productService;

    @GetMapping("/id/{productId}")
    @Operation(summary = "Return a product matching the ID")
    @ApiGlobalErrors      
    @ApiNotFoundResponse  
    @ApiResponse(responseCode = "200", description = "Product found", 
        content = @Content(mediaType = "application/json", schema = @Schema(implementation = ProductInfoDTO.class)))
    public ResponseEntity<ProductInfoDTO> getProductById(@PathVariable UUID productId) {
        return ResponseEntity.ok(productService.findById(productId));
    }

    @GetMapping("/category/{productCategory}")
    @Operation(summary = "Return a product collection matching the category")
    @ApiGlobalErrors
    @ApiResponse(responseCode = "200", description = "Products found", 
    content = @Content(mediaType = "application/json", array = @ArraySchema(schema = @Schema(implementation = ProductInfoDTO.class))))
    public ResponseEntity<Set<ProductInfoDTO>> getProductByCategory(@PathVariable ProductCategory productCategory) {
        return ResponseEntity.ok(productService.findByCategory(productCategory));
    }

    @GetMapping("/search")
    @Operation(summary = "Return a product collection matching the search query")
    @ApiGlobalErrors
    @ApiResponse(responseCode = "200", description = "Search results", 
        content = @Content(mediaType = "application/json", array = @ArraySchema(schema = @Schema(implementation = ProductInfoDTO.class))))
    public ResponseEntity<Set<ProductInfoDTO>> searchProducts(@RequestParam("name") String name) {
        return ResponseEntity.ok(productService.search(name));
    }
}