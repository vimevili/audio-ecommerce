package com.vimevili.audio_ecommerce.models;

import com.fasterxml.jackson.annotation.JsonProperty;
import com.vimevili.audio_ecommerce.enums.UserRoles;
import jakarta.persistence.*;
import org.jspecify.annotations.Nullable;
import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.core.authority.SimpleGrantedAuthority;
import org.springframework.security.core.userdetails.UserDetails;

import java.io.Serial;
import java.io.Serializable;
import java.util.*;

@Entity
@Table(name = "users")
public class UserModel implements Serializable, UserDetails {

    @Serial
    private static final long serialVersionUID = -5261257122332581559L;

    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    private UUID id;

    @Column(nullable = false)
    private String name;

    @Column(nullable = true, columnDefinition = "TEXT")
    private String picture;

    @Column(nullable = false, unique = true, columnDefinition = "TEXT")
    private String username;

    @Column(nullable = false, columnDefinition = "TEXT")
    private String password;

    @Column(nullable = false,  unique = true, columnDefinition = "TEXT")
    private String email;

    @Enumerated(EnumType.STRING)
    private UserRoles role;

    @JsonProperty(access = JsonProperty.Access.WRITE_ONLY)
    @OneToMany(mappedBy = "user", fetch = FetchType.LAZY, cascade = CascadeType.ALL, orphanRemoval = true)
    private Set<ReviewModel> reviews = new HashSet<>();

    protected UserModel() {}


    public UserModel(String name, String username, String password, String email, String role) {
        this.name = name;
        this.username = username;
        this.password = password;
        this.email = email;
        setRole(role);
    }
    public UserModel(String name, String picture,String username, String password, String email, String role) {
        this.name = name;
        this.picture = picture;
        this.username = username;
        this.password = password;
        this.email = email;
        setRole(role);
    }

    public UserRoles getRole() {
        return role;
    }

    public void setRole(String role) {
        this.role = UserRoles.valueOf(role.toUpperCase());
    }
    public String getEmail() {
        return email;
    }

    public void setEmail(String email) {
        this.email = email;
    }

    public void setPassword(String password) {
        this.password = password;
    }

    public void setUsername(String username) {
        this.username = username;
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

    @Override
    public Collection<? extends GrantedAuthority> getAuthorities() {
        if (this.role == UserRoles.ADMIN) return List.of(new SimpleGrantedAuthority("ROLE_ADMIN"), new SimpleGrantedAuthority("ROLE_USER"));
        else return List.of(new SimpleGrantedAuthority("ROLE_USER"));
    }

    @Override
    public @Nullable String getPassword() {
        return password;
    }

    @Override
    public String getUsername() {
        return username;
    }
}
