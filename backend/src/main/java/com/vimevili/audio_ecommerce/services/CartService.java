package com.vimevili.audio_ecommerce.services;

import com.vimevili.audio_ecommerce.dtos.cart.*;
import com.vimevili.audio_ecommerce.exceptions.ResourceNotFoundException;
import com.vimevili.audio_ecommerce.models.CartItemModel;
import com.vimevili.audio_ecommerce.models.CartModel;
import com.vimevili.audio_ecommerce.models.ProductModel;
import com.vimevili.audio_ecommerce.models.UserModel;
import com.vimevili.audio_ecommerce.respositories.CartRepository;
import com.vimevili.audio_ecommerce.respositories.ProductRepository;
import com.vimevili.audio_ecommerce.respositories.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.Collections;
import java.util.Set;
import java.util.UUID;
import java.util.stream.Collectors;


@Service
public class CartService  {
    @Autowired
    private CartRepository cartRepository;
    @Autowired
    private ProductRepository productRepository;
    @Autowired
    private UserRepository userRepository;

    public CartInfo findByUserId(String str_user_id) {
        UUID userId = UUID.fromString(str_user_id);
        return cartRepository.findByUserId(userId)
                .map(cart -> new CartInfo(
                        cart.getId(),
                        cart.getTotalCartValue(),
                        cart.getProducts().stream().map(product -> new CartItemInfo(product.getId(), product.getProduct().getName(), product.getQuantity(), product.calculateTotalPrice())).collect(Collectors.toSet())
                ))
                .orElseThrow(() -> new ResourceNotFoundException("Carrinho não encontrado para o usuário: " + userId));
    }

    public CartInfo createCart(CartRequest user_info) {
        UUID userId = UUID.fromString(user_info.user_id());
        UserModel user = userRepository.findById(userId)
                .orElseThrow(() -> new ResourceNotFoundException("Usuário não encontrado"));

        CartModel cart = cartRepository.save(new CartModel(user));
        return new CartInfo(
                cart.getId(),
                cart.getTotalCartValue(),
                Collections.emptySet()
        );

    }

    public AddToCartInfo addToCart(AddToCartRequest data) {
        UUID cartId = UUID.fromString(data.cart_id());

        ProductModel product = productRepository.findById(UUID.fromString(data.product_id()))
                .orElseThrow(() -> new ResourceNotFoundException("Produto não encontrado!"));

        return cartRepository.findById(cartId)
                .map(cart -> {
                    CartItemModel newItem = new CartItemModel(product, data.quantity());
                    cart.addProducts(Set.of(newItem));
                    cartRepository.save(cart);
                    return new AddToCartInfo("Item adicionado com sucesso");
                })
                .orElseThrow(() -> new ResourceNotFoundException("Carrinho não encontrado!"));
    }

}



