package com.vimevili.audio_ecommerce.models;

import jakarta.persistence.*;

import java.io.Serial;
import java.io.Serializable;
import java.util.Objects;
import java.util.Set;
import java.util.UUID;

@Entity
@Table(name = "cart")
public class Cart implements Serializable {
    @Serial
    private static final long serialVersionUID = 1130302548136032857L;

    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    private UUID id;

    @OneToMany(cascade = CascadeType.ALL, orphanRemoval = true)
    @JoinColumn(name = "cart_id")
    private Set<CartItem> products;

    @Column(nullable = true)
    private Double totalCartValue;

    @OneToOne
    @JoinColumn(name = "user_id")
    private UserModel user;

    protected Cart() {}

    public Cart(UserModel user) {
        this.user = user;
    }

    public Cart(Set<CartItem> products, UserModel user) {
        this.products = products;
        this.user = user;
        this.totalCartValue = calculateTotal();
    }

    public UUID getId() {
        return id;
    }

    public Set<CartItem> getProducts() {
        return products;
    }

    public Double getTotalCartValue() {
        return totalCartValue;
    }

    public UserModel getUser() {
        return user;
    }

    public void addProducts(Set<CartItem> products) {
        this.products.addAll(products);
    }

    public void removeProducts(UUID product_id) {
        this.products.removeIf(product -> product.getId().equals(product_id));
    }

    public void emptyCart() {
        this.products.clear();
    }

    public Double calculateTotal() {
        totalCartValue = this.products.stream().map(CartItem::calculateTotalPrice).reduce( 0.0, Double::sum);
        return totalCartValue;
    }

    @Override
    public boolean equals(Object o) {
        if (o == null || getClass() != o.getClass()) return false;
        Cart cart = (Cart) o;
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
