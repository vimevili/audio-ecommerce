package com.vimevili.audio_ecommerce.controllers;

import java.util.Set;
import java.util.UUID;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import com.vimevili.audio_ecommerce.dtos.product.ProductDetailsDTO;
import com.vimevili.audio_ecommerce.dtos.product.ProductInfoDTO;
import com.vimevili.audio_ecommerce.enums.ProductCategory;
import com.vimevili.audio_ecommerce.enums.ProductSortField;
import com.vimevili.audio_ecommerce.infra.docs.ApiGlobalErrors;
import com.vimevili.audio_ecommerce.infra.docs.ApiNotFoundResponse;
import com.vimevili.audio_ecommerce.services.ProductService;

import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.Parameter;
import io.swagger.v3.oas.annotations.media.ArraySchema;
import io.swagger.v3.oas.annotations.media.Content;
import io.swagger.v3.oas.annotations.media.Schema;
import io.swagger.v3.oas.annotations.responses.ApiResponse;
import io.swagger.v3.oas.annotations.tags.Tag;

@RestController
@RequestMapping("/api/products")
@Tag(name = "Products", description = "Endpoints for basic Product operations")
public class ProductController {

    @Autowired
    private ProductService productService;

    @GetMapping("/id/{productId}")
    @Operation(summary = "Return a product matching the ID with its reviews")
    @ApiGlobalErrors      
    @ApiNotFoundResponse  
    @ApiResponse(responseCode = "200", description = "Product found", 
        content = @Content(mediaType = "application/json", schema = @Schema(implementation = ProductDetailsDTO.class)))
    public ResponseEntity<ProductDetailsDTO> getProductById(@PathVariable UUID productId) {
        return ResponseEntity.ok(productService.findById(productId));
    }

    @GetMapping
    @Operation(summary = "Search and filter products with optional category, search term and sorting")
    @ApiGlobalErrors
    @ApiResponse(responseCode = "200", description = "Products found", 
        content = @Content(mediaType = "application/json", array = @ArraySchema(schema = @Schema(implementation = ProductInfoDTO.class))))
    public ResponseEntity<Set<ProductInfoDTO>> getProducts(
            @Parameter(description = "Filter by product category")
            @RequestParam(required = false) ProductCategory category,
            
            @Parameter(description = "Search term to filter products by name")
            @RequestParam(required = false) String search,
            
            @Parameter(description = "Field to sort by (NAME, PRICE, RATING, REVIEWS)")
            @RequestParam(required = false) ProductSortField sortBy,
            
            @Parameter(description = "Sort direction: asc or desc", schema = @Schema(allowableValues = {"asc", "desc"}))
            @RequestParam(defaultValue = "asc") String sortDir
    ) {
        return ResponseEntity.ok(productService.findProducts(category, search, sortBy, sortDir));
    }
}