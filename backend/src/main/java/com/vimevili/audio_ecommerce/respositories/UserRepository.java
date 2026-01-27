package com.vimevili.audio_ecommerce.respositories;

import com.vimevili.audio_ecommerce.models.UserModel;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.security.core.userdetails.UserDetails;

import java.util.Optional;
import java.util.UUID;

public interface UserRepository extends JpaRepository<UserModel, UUID> {
    UserDetails findByUsername(String username);
    UserDetails findByUsernameOrEmail(String username, String email);
    Optional<UserModel> findByEmail(String email);
}