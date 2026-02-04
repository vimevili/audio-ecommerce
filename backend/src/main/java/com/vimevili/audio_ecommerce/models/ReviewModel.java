package com.vimevili.audio_ecommerce.models;

import jakarta.persistence.*;

import java.io.Serial;
import java.io.Serializable;
import java.util.Objects;
import java.util.UUID;

@Entity
@Table(name = "reviews")
public class ReviewModel implements Serializable {

    @Serial
    private static final long serialVersionUID = -1894336559531043717L;

    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    private UUID id;

    @Column(nullable = true)
    private String content;

    @Column(nullable = false)
    private Float rate;

    @ManyToOne
    @JoinColumn(name = "user_id")
    private UserModel user;

    @ManyToOne
    @JoinColumn(name = "product_id", nullable = false)
    private ProductModel product;

    protected ReviewModel() {   }

    public ReviewModel(Float rate, String content, UserModel user, ProductModel product) {
        this.rate = rate;
        this.user = user;
        this.content = content;
        this.product = product;
    }

    public ReviewModel(Float rate, UserModel user, ProductModel product) {
        this.rate = rate;
        this.user = user;
        this.product = product;
    }

    public ProductModel getProduct() {
        return product;
    }

    public UUID getId() {
        return id;
    }

    public String getContent() {
        return content;
    }

    public void updateContent(String content) {
        this.content = content;
    }

    public Float getRate() {
        return rate;
    }

    public void updateRate(Float rate) {
        this.rate = rate;
    }

    public UserModel getUser() {
        return user;
    }

    @Override
    public boolean equals(Object o) {
        if (o == null || getClass() != o.getClass()) return false;
        ReviewModel that = (ReviewModel) o;
        return Objects.equals(id, that.id);
    }

    @Override
    public int hashCode() {
        return Objects.hashCode(id);
    }

    @Override
    public String toString() {
        return "Review" + '\'' +
                "User=" + user +
                ", " + rate + " stars. " +
                "Content: " + content;
    }
}
