package com.vimevili.audio_ecommerce.respositories;

import com.vimevili.audio_ecommerce.models.UserModel;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.UUID;

public interface UserRepository extends JpaRepository<UserModel, UUID> {

}
