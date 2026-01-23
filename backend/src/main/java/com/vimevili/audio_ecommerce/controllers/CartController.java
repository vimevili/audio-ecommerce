package com.vimevili.audio_ecommerce.controllers;

import com.vimevili.audio_ecommerce.dtos.cart.AddToCartInfo;
import com.vimevili.audio_ecommerce.dtos.cart.AddToCartRequest;
import com.vimevili.audio_ecommerce.dtos.cart.CartInfo;
import com.vimevili.audio_ecommerce.dtos.cart.CartRequest;
import com.vimevili.audio_ecommerce.services.CartService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/cart")
public class CartController {

    @Autowired
    private CartService cartService;

    @PostMapping("/create")
    public ResponseEntity<CartInfo> postCart(@RequestBody CartRequest cartData) {
        CartInfo cartInfo = cartService.createCart(cartData);
        return ResponseEntity.ok(cartInfo);
    }

    @GetMapping("/user/{userId}")
    public ResponseEntity<CartInfo> getCartByUser(@PathVariable String userId) {
        CartInfo cart = cartService.findByUserId(userId);
        return ResponseEntity.ok(cart);
    }

    @PostMapping("/add")
    public ResponseEntity<AddToCartInfo> addToCart(@RequestBody AddToCartRequest cartData) {
        AddToCartInfo cartInfo = cartService.addToCart(cartData);
        return ResponseEntity.ok(cartInfo);
    }

}