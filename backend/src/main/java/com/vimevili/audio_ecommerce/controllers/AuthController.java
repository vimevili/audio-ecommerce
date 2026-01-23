package com.vimevili.audio_ecommerce.controllers;


import com.vimevili.audio_ecommerce.dtos.user.AuthDTO;
import com.vimevili.audio_ecommerce.dtos.user.LoginResponseDTO;
import com.vimevili.audio_ecommerce.dtos.user.RegisterDTO;
import com.vimevili.audio_ecommerce.infra.security.TokenService;
import com.vimevili.audio_ecommerce.models.UserModel;
import com.vimevili.audio_ecommerce.respositories.UserRepository;
import jakarta.validation.Valid;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("auth")
public class AuthController {
    @Autowired
    private AuthenticationManager authenticationManager;
    @Autowired
    private UserRepository userRepository;
    @Autowired
    private TokenService tokenService;

    @PostMapping("/login")
    public ResponseEntity login(@RequestBody @Valid AuthDTO data){
        var usernamePassword = new UsernamePasswordAuthenticationToken(data.username(), data.password());
        var auth = this.authenticationManager.authenticate(usernamePassword);

        var token = tokenService.generateToken((UserModel) auth.getPrincipal());

        return ResponseEntity.ok(new LoginResponseDTO(token));
    }

    @PostMapping("/register")
    public ResponseEntity register(@RequestBody @Valid RegisterDTO data){
        if(this.userRepository.findByUsername(data.username()) != null) return ResponseEntity.badRequest().build();

        String encryptedPassword = new BCryptPasswordEncoder().encode(data.password());
        UserModel newUser = new UserModel(data.name(), data.username(), encryptedPassword, data.email(), data.role());

        this.userRepository.save(newUser);

        return ResponseEntity.ok().build();
    }
}