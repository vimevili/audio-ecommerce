package com.vimevili.audio_ecommerce.controllers;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.vimevili.audio_ecommerce.dtos.cart.CartInfoDTO;
import com.vimevili.audio_ecommerce.dtos.cart.CartRequestDTO;
import com.vimevili.audio_ecommerce.dtos.cart.ChangeItemInfoDTO;
import com.vimevili.audio_ecommerce.dtos.cart.ChangeItemRequestDTO;
import com.vimevili.audio_ecommerce.infra.docs.ApiAuthErrors;
import com.vimevili.audio_ecommerce.infra.docs.ApiGlobalErrors;
import com.vimevili.audio_ecommerce.infra.docs.ApiNotFoundResponse;
import com.vimevili.audio_ecommerce.services.CartService;

import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.media.Content;
import io.swagger.v3.oas.annotations.media.Schema;
import io.swagger.v3.oas.annotations.responses.ApiResponse;
import io.swagger.v3.oas.annotations.tags.Tag;

@RestController
@RequestMapping("/api/cart")
@Tag(name = "Cart", description = "Endpoints for shopping cart management")
@ApiAuthErrors   
@ApiGlobalErrors 
public class CartController {

    @Autowired
    private CartService cartService;

    @PostMapping("/create")
    @Operation(summary = "Create a new empty cart")
    @ApiResponse(responseCode = "201", description = "Cart successfully created!", 
        content = @Content(mediaType = "application/json", schema = @Schema(implementation = CartInfoDTO.class)))
    public ResponseEntity<CartInfoDTO> postCart(@RequestBody CartRequestDTO cartData) {
        return ResponseEntity.status(HttpStatus.CREATED).body(cartService.createCart(cartData));
    }

    @GetMapping("/user/{userId}")
    @Operation(summary = "Return a specific user's cart")
    @ApiNotFoundResponse 
    @ApiResponse(responseCode = "200", description = "Cart found", 
        content = @Content(mediaType = "application/json", schema = @Schema(implementation = CartInfoDTO.class)))
    public ResponseEntity<CartInfoDTO> getCartByUser(@PathVariable String userId) {
        return ResponseEntity.ok(cartService.findByUserId(userId));
    }

    @PostMapping("/add")
    @Operation(summary = "Add a product to the cart")
    @ApiNotFoundResponse
    @ApiResponse(responseCode = "200", description = "Item added successfully", 
        content = @Content(mediaType = "application/json", schema = @Schema(implementation = ChangeItemInfoDTO.class)))
    public ResponseEntity<ChangeItemInfoDTO> addToCart(@RequestBody ChangeItemRequestDTO cartData) {
        return ResponseEntity.ok(cartService.addToCart(cartData));
    }

    @DeleteMapping("/delete")
    @Operation(summary = "Remove a product from the cart")
    @ApiNotFoundResponse
    @ApiResponse(responseCode = "200", description = "Item removed successfully", 
        content = @Content(mediaType = "application/json", schema = @Schema(implementation = ChangeItemInfoDTO.class)))
    public ResponseEntity<ChangeItemInfoDTO> deleteFromCart(@RequestBody ChangeItemRequestDTO cartData) {
        return ResponseEntity.ok(cartService.removeFromCart(cartData));
    }
}