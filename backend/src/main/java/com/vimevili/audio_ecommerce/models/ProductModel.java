package com.vimevili.audio_ecommerce.models;

import com.vimevili.audio_ecommerce.enums.ProductCategory;
import jakarta.persistence.*;

import java.io.Serial;
import java.io.Serializable;
import java.util.HashSet;
import java.util.Objects;
import java.util.Set;
import java.util.UUID;

@Entity
@Table(name = "products")
public class ProductModel implements Serializable {

    @Serial
    private static final long serialVersionUID = -1933973248199046948L;

    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    private UUID id;

    @Column(nullable = false)
    private String name;

    @Column(nullable = true, columnDefinition = "TEXT")
    private String picture;

    @Column(nullable = false, columnDefinition = "TEXT")
    private String description;

    @Enumerated(EnumType.STRING)
    @Column(nullable = false)
    private ProductCategory category;

    @Column(nullable = false)
    private Double price;

    @OneToMany(mappedBy = "product", cascade = CascadeType.ALL, orphanRemoval = true)
    private Set<ReviewModel> reviews = new HashSet<>();

    protected ProductModel() {
    }

    public ProductModel(Double price, String picture, String name, String description, ProductCategory category, Set<ReviewModel> reviews) {
        this.price = price;
        this.picture = picture;
        this.name = name;
        this.description = description;
        this.category = category;
        this.reviews = reviews;
    }

    public ProductModel(Double price, String picture, String name, String description, ProductCategory category) {
        this.price = price;
        this.picture = picture;
        this.name = name;
        this.description = description;
        this.category = category;
    }

    public UUID getId() {
        return id;
    }

    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
    }

    public String getPicture() {
        return picture;
    }

    public void setPicture(String picture) {
        this.picture = picture;
    }


    public String getDescription() {
        return description;
    }

    public void setDescription(String description) {
        this.description = description;
    }

    public Set<ReviewModel> getReviews() {
        return reviews;
    }

    public void setReviews(Set<ReviewModel> reviews) {
        this.reviews.addAll(reviews);
    }

    public ProductCategory getCategory() {
        return category;
    }

    public Double getPrice() {
            return price;
    }

    public void updatePrice(Double newPrice) {
        this.price = newPrice;
    }

    @Override
    public boolean equals(Object o) {
        if (o == null || getClass() != o.getClass()) return false;
        ProductModel product = (ProductModel) o;
        return Objects.equals(id, product.id);
    }

    @Override
    public int hashCode() {
        return Objects.hashCode(id);
    }

    @Override
    public String toString() {
        return name +
                ", R$" + price;
    }
}
