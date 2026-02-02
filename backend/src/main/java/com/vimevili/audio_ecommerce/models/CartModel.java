package com.vimevili.audio_ecommerce.models;

import java.io.Serial;
import java.io.Serializable;
import java.util.Objects;
import java.util.Set;
import java.util.UUID;

import jakarta.persistence.CascadeType;
import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.OneToMany;
import jakarta.persistence.OneToOne;
import jakarta.persistence.Table;

@Entity
@Table(name = "carts")
public class CartModel implements Serializable {
    @Serial
    private static final long serialVersionUID = 1130302548136032857L;

    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    private UUID id;

    @OneToMany(mappedBy = "cart", cascade = CascadeType.ALL, orphanRemoval = true)
    private Set<CartItemModel> products;
    @Column(nullable = true)
    private Double totalCartValue;

    @OneToOne
    @JoinColumn(name = "user_id")
    private UserModel user;

    protected CartModel() {}

    public CartModel(UserModel user) {
        this.user = user;
    }

    public CartModel(Set<CartItemModel> products, UserModel user) {
        this.products = products;
        this.user = user;
        this.totalCartValue = calculateTotal();
    }

    public UUID getId() {
        return id;
    }

    public Set<CartItemModel> getProducts() {
        return products;
    }

    public Double getTotalCartValue() {
        return totalCartValue;
    }

    public UserModel getUser() {
        return user;
    }

    public CartModel addProducts(Set<CartItemModel> newItems) {
        newItems.forEach(item -> item.setCart(this));
        this.products.addAll(newItems);
        this.calculateTotal();
        return this;
    }

    public void removeProducts(UUID product_id) {
        this.products.removeIf(product -> product.getId().equals(product_id));
    }

    public void emptyCart() {
        this.products.clear();
    }

    public Double calculateTotal() {
        totalCartValue = this.products.stream()
                .mapToDouble(CartItemModel::calculateTotalPrice)
                .sum();
        return totalCartValue;
    }

    @Override
    public boolean equals(Object o) {
        if (o == null || getClass() != o.getClass()) return false;
        CartModel cart = (CartModel) o;
        return Objects.equals(id, cart.id);
    }

    @Override
    public int hashCode() {
        return Objects.hashCode(id);
    }

    @Override
    public String toString() {
        return "Cart: " +
                "products: " + products.toString() +
                ", total= R$" + totalCartValue;
    }
}
