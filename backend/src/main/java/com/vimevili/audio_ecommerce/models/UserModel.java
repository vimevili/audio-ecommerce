package com.vimevili.audio_ecommerce.models;

import com.fasterxml.jackson.annotation.JsonProperty;
import jakarta.persistence.*;

import java.io.Serial;
import java.io.Serializable;
import java.util.HashSet;
import java.util.Objects;
import java.util.Set;
import java.util.UUID;

@Entity
@Table(name = "users")
public class UserModel implements Serializable {

    @Serial
    private static final long serialVersionUID = -5261257122332581559L;

    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    private UUID id;

    @Column(nullable = false)
    private String name;

    @Column(nullable = true, columnDefinition = "TEXT")
    private String picture;

    @JsonProperty(access = JsonProperty.Access.WRITE_ONLY)
    @OneToMany(mappedBy = "user", fetch = FetchType.LAZY, cascade = CascadeType.ALL, orphanRemoval = true)
    private Set<ReviewModel> reviews = new HashSet<>();

    protected UserModel() {}

    public UserModel(String name) {
        this.name = name;
    }

    public UserModel(String name, String picture) {
        this.name = name;
        this.picture = picture;
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

    @Override
    public boolean equals(Object o) {
        if (o == null || getClass() != o.getClass()) return false;
        UserModel userModel = (UserModel) o;
        return Objects.equals(id, userModel.id);
    }

    @Override
    public int hashCode() {
        return Objects.hashCode(id);
    }

    @Override
    public String toString() {
        return "User: " +
                name;
    }

    public void createReview(ReviewModel review, String comment, Float rate) {
        review.updateContent(comment);
        review.updateRate(rate);
        reviews.add(review);
    }

    public void createReview(ReviewModel review,  Float rate) {
        review.updateRate(rate);
        reviews.add(review);
    }

    public void deleteReview(UUID id) {
        reviews.removeIf(item -> item.getId().equals(id));
    }

    public void updateReview(UUID id,String comment, Float rate) {
        ReviewModel reviewForUpdate = reviews.stream().filter(item -> item.getId().equals(id)).findFirst()
                .orElseThrow(() -> new RuntimeException("Review " + id + " not found!"));
        reviewForUpdate.updateRate(rate);
        reviewForUpdate.updateContent(comment);
    }
}
