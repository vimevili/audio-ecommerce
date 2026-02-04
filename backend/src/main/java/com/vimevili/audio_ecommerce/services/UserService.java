package com.vimevili.audio_ecommerce.services;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.vimevili.audio_ecommerce.respositories.UserRepository;

@Service
public class UserService {

    @Autowired
    private UserRepository userRepository;

    public boolean isUsernameTaken(String username) {
        return !userRepository.existsByUsername(username);
    }

    public boolean isEmailTaken(String email) {
        return !userRepository.existsByEmail(email);
    }
}

