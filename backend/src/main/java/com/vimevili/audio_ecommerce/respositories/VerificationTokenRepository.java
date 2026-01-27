package com.vimevili.audio_ecommerce.respositories;

import com.vimevili.audio_ecommerce.models.VerificationToken;
import org.springframework.data.jpa.repository.JpaRepository;
import java.util.UUID;

public interface VerificationTokenRepository extends JpaRepository<VerificationToken, UUID> {
    VerificationToken findByToken(String token);
}