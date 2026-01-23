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
import jakarta.transaction.Transactional;
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

    public CartInfoDTO findByUserId(String str_user_id) {
        UUID userId = UUID.fromString(str_user_id);

        return cartRepository.findByUserId(userId)
                .map(cart -> {
                    Set<CartItemInfoDTO> itemsDto = cart.getProducts().stream()
                            .map(product -> new CartItemInfoDTO(
                                    product.getId(),
                                    product.getProduct().getName(),
                                    product.getQuantity(),
                                    product.calculateTotalPrice()
                            ))
                            .collect(Collectors.toSet());

                    Double realCartTotalValue = cart.getProducts().stream()
                            .mapToDouble(CartItemModel::calculateTotalPrice)
                            .sum();

                    if (!realCartTotalValue.equals(cart.getTotalCartValue())) {
                        cart.calculateTotal();
                        cartRepository.save(cart);
                    }

                    return new CartInfoDTO(cart.getId(), realCartTotalValue, itemsDto);
                })
                .orElseThrow(() -> new ResourceNotFoundException("No cart was found for user with ID " + userId));
    }

    public CartInfoDTO createCart(CartRequestDTO user_info) {
        UUID userId = UUID.fromString(user_info.user_id());
        UserModel user = userRepository.findById(userId)
                .orElseThrow(() -> new ResourceNotFoundException("User not found!"));

        CartModel cart = cartRepository.save(new CartModel(user));
        return new CartInfoDTO(
                cart.getId(),
                cart.getTotalCartValue(),
                Collections.emptySet()
        );

    }

    @Transactional
    public ChangeItemInfoDTO addToCart(ChangeItemRequestDTO data) {
        UUID cartId = UUID.fromString(data.cart_id());

        ProductModel product = productRepository.findById(UUID.fromString(data.product_id()))
                .orElseThrow(() -> new ResourceNotFoundException("Product not found!"));

        return cartRepository.findByIdWithItems(cartId)
                .map(cart -> {
                    CartItemModel newItem = new CartItemModel(product, data.quantity());
                    cart.addProducts(Set.of(newItem));
                    cartRepository.save(cart);
                    return new ChangeItemInfoDTO("Item added successfully!");
                })
                .orElseThrow(() -> new ResourceNotFoundException("Cart not found!"));
    }

    @Transactional
    public ChangeItemInfoDTO removeFromCart(ChangeItemRequestDTO data) {
        UUID cartId = UUID.fromString(data.cart_id());
        UUID productId = UUID.fromString(data.product_id());

        CartModel cart = cartRepository.findByIdWithItems(cartId)
                .orElseThrow(() -> new ResourceNotFoundException("Cart not found!"));

        cart.removeProducts(productId);
        cart.calculateTotal();

        cartRepository.save(cart);

        return new ChangeItemInfoDTO("Item removed successfully!");
    }

}



