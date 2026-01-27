package com.vimevili.audio_ecommerce.respositories;

import com.vimevili.audio_ecommerce.models.PasswordResetToken;
import com.vimevili.audio_ecommerce.models.UserModel;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.Optional;
import java.util.UUID;

public interface PasswordResetTokenRepository extends JpaRepository<PasswordResetToken, UUID> {

    Optional<PasswordResetToken> findByToken(String token);

    void deleteByUser(UserModel user);
}