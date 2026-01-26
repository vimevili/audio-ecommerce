package com.vimevili.audio_ecommerce.controllers;

import com.vimevili.audio_ecommerce.dtos.cart.ChangeItemInfoDTO;
import com.vimevili.audio_ecommerce.dtos.cart.ChangeItemRequestDTO;
import com.vimevili.audio_ecommerce.dtos.cart.CartInfoDTO;
import com.vimevili.audio_ecommerce.dtos.cart.CartRequestDTO;
import com.vimevili.audio_ecommerce.services.CartService;
import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.media.Content;
import io.swagger.v3.oas.annotations.responses.ApiResponse;
import io.swagger.v3.oas.annotations.security.SecurityRequirement;
import io.swagger.v3.oas.annotations.tags.Tag;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/cart")
@Tag(name = "Cart", description = "Endpoints for basic cart operations (create, add, remove, get)")
public class CartController {

    @Autowired
    private CartService cartService;

    @PostMapping("/create")
    @Operation(summary = "Create a new empty cart", security = @SecurityRequirement(name = "bearer-key"))
    @ApiResponse(responseCode = "201", description = "Cart successfully created!", content = @Content)
    @ApiResponse(responseCode = "500", description = "Internal Server Error", content = @Content)
    public ResponseEntity<CartInfoDTO> postCart(@RequestBody CartRequestDTO cartData) {
        CartInfoDTO cartInfoDTO = cartService.createCart(cartData);
        return ResponseEntity.ok(cartInfoDTO);
    }

    @GetMapping("/user/{userId}")
    @Operation(summary = "Return an user's cart", security = @SecurityRequirement(name = "bearer-key"))
    @ApiResponse(responseCode = "200")
    @ApiResponse(responseCode = "400", description = "User doesn't have permission to access this cart!", content = @Content)
    @ApiResponse(responseCode = "500", description = "Internal Server Error", content = @Content)
    public ResponseEntity<CartInfoDTO> getCartByUser(@PathVariable String userId) {
        CartInfoDTO cart = cartService.findByUserId(userId);
        return ResponseEntity.ok(cart);
    }

    @PostMapping("/add")
    @Operation(summary = "Add a product to a cart", security = @SecurityRequirement(name = "bearer-key"))
    @ApiResponse(responseCode = "201", description = "Item successfully added!", content = @Content)
    @ApiResponse(responseCode = "500", description = "Internal Server Error", content = @Content)
    public ResponseEntity<ChangeItemInfoDTO> addToCart(@RequestBody ChangeItemRequestDTO cartData) {
        ChangeItemInfoDTO cartInfo = cartService.addToCart(cartData);
        return ResponseEntity.ok(cartInfo);
    }

    @DeleteMapping("/delete")
    @ApiResponse(responseCode = "201", description = "Item successfully removed!", content = @Content)
    @ApiResponse(responseCode = "500", description = "Internal Server Error", content = @Content)
    @Operation(summary = "Delete a product from a cart", security = @SecurityRequirement(name = "bearer-key"))
    public ResponseEntity<ChangeItemInfoDTO> deleteFromCart(@RequestBody ChangeItemRequestDTO cartData) {
        ChangeItemInfoDTO cartInfo = cartService.addToCart(cartData);
        return ResponseEntity.ok(cartInfo);
    }

}