package com.vimevili.audio_ecommerce.services;

import java.util.Collections;
import java.util.Set;
import java.util.UUID;
import java.util.stream.Collectors;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.vimevili.audio_ecommerce.dtos.cart.CartInfoDTO;
import com.vimevili.audio_ecommerce.dtos.cart.CartItemInfoDTO;
import com.vimevili.audio_ecommerce.dtos.cart.CartRequestDTO;
import com.vimevili.audio_ecommerce.dtos.cart.ChangeItemInfoDTO;
import com.vimevili.audio_ecommerce.dtos.cart.ChangeItemRequestDTO;
import com.vimevili.audio_ecommerce.exceptions.ResourceNotFoundException;
import com.vimevili.audio_ecommerce.models.CartItemModel;
import com.vimevili.audio_ecommerce.models.CartModel;
import com.vimevili.audio_ecommerce.models.ProductModel;
import com.vimevili.audio_ecommerce.models.UserModel;
import com.vimevili.audio_ecommerce.respositories.CartRepository;
import com.vimevili.audio_ecommerce.respositories.ProductRepository;
import com.vimevili.audio_ecommerce.respositories.UserRepository;

import jakarta.transaction.Transactional;


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
                            .map(item -> new CartItemInfoDTO(
                                    item.getProduct().getId(),
                                    item.getProduct().getName(),
                                    item.getProduct().getPicture(),
                                    item.getProduct().getPrice(),
                                    item.getQuantity(),
                                    item.calculateTotalPrice()
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
    public CartInfoDTO getOrCreateCart(String strUserId) {
        UUID userId = UUID.fromString(strUserId);
        
        return cartRepository.findByUserId(userId)
                .map(cart -> {
                    Set<CartItemInfoDTO> itemsDto = cart.getProducts().stream()
                            .map(item -> new CartItemInfoDTO(
                                    item.getProduct().getId(),
                                    item.getProduct().getName(),
                                    item.getProduct().getPicture(),
                                    item.getProduct().getPrice(),
                                    item.getQuantity(),
                                    item.calculateTotalPrice()
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
                .orElseGet(() -> {
                    UserModel user = userRepository.findById(userId)
                            .orElseThrow(() -> new ResourceNotFoundException("User not found!"));
                    CartModel cart = cartRepository.save(new CartModel(user));
                    return new CartInfoDTO(
                            cart.getId(),
                            cart.getTotalCartValue(),
                            Collections.emptySet()
                    );
                });
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

    @Transactional
    public ChangeItemInfoDTO decrementItem(ChangeItemRequestDTO data) {
        UUID cartId = UUID.fromString(data.cart_id());
        UUID productId = UUID.fromString(data.product_id());

        CartModel cart = cartRepository.findByIdWithItems(cartId)
                .orElseThrow(() -> new ResourceNotFoundException("Cart not found!"));

        CartItemModel item = cart.getProducts().stream()
                .filter(i -> i.getProduct().getId().equals(productId))
                .findFirst()
                .orElseThrow(() -> new ResourceNotFoundException("Item not found in cart!"));

        if (item.getQuantity() <= data.quantity()) {
            cart.removeProducts(productId);
        } else {
            item.setQuantity(item.getQuantity() - data.quantity());
        }

        cart.calculateTotal();
        cartRepository.save(cart);

        return new ChangeItemInfoDTO("Item quantity decremented successfully!");
    }

    @Transactional
    public ChangeItemInfoDTO clearCart(String strCartId) {
        UUID cartId = UUID.fromString(strCartId);

        CartModel cart = cartRepository.findByIdWithItems(cartId)
                .orElseThrow(() -> new ResourceNotFoundException("Cart not found!"));

        cart.emptyCart();
        cart.calculateTotal();
        cartRepository.save(cart);

        return new ChangeItemInfoDTO("Cart cleared successfully!");
    }
}



