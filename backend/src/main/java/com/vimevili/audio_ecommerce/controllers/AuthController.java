package com.vimevili.audio_ecommerce.controllers;


import com.vimevili.audio_ecommerce.dtos.user.AuthDTO;
import com.vimevili.audio_ecommerce.dtos.user.LoginResponseDTO;
import com.vimevili.audio_ecommerce.dtos.user.RegisterDTO;
import com.vimevili.audio_ecommerce.infra.security.TokenService;
import com.vimevili.audio_ecommerce.models.UserModel;
import com.vimevili.audio_ecommerce.respositories.UserRepository;
import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.media.Content;
import io.swagger.v3.oas.annotations.responses.ApiResponse;
import io.swagger.v3.oas.annotations.responses.ApiResponses;
import io.swagger.v3.oas.annotations.tags.Tag;
import jakarta.validation.Valid;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.BadCredentialsException;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("auth")
@Tag(name = "Authentication", description = "Endpoints for authentication")
public class AuthController {
    @Autowired
    private AuthenticationManager authenticationManager;
    @Autowired
    private UserRepository userRepository;
    @Autowired
    private TokenService tokenService;

    @PostMapping("/login")
    @Operation(summary = "Sign In", description = "Return a JWT token if the credentials are valid")
    @ApiResponses(value = {
        @ApiResponse(responseCode = "200", description = "User successfully authenticated!", content = @Content),
        @ApiResponse(responseCode = "401", description = "Either the username or password you are trying to log in with are incorrect!", content = @Content),
        @ApiResponse(responseCode = "500", description = "Internal Server Error", content = @Content)
    })
    public ResponseEntity login(@RequestBody @Valid AuthDTO data){
        try {
            var usernamePassword = new UsernamePasswordAuthenticationToken(data.username(), data.password());
            var auth = this.authenticationManager.authenticate(usernamePassword);

            var token = tokenService.generateToken((UserModel) auth.getPrincipal());
            return ResponseEntity.ok(new LoginResponseDTO(token));

        } catch (BadCredentialsException e) {
            return ResponseEntity.status(HttpStatus.UNAUTHORIZED).body("Either the username or password you are trying to log in with are incorrect");
        }
    }

    @PostMapping("/register")
    @Operation(summary = "Sign Up", description = "Create a new user")
    @ApiResponses(value = {
            @ApiResponse(responseCode = "201", description = "User successfully created!", content = @Content),
            @ApiResponse(responseCode = "400", description = "Invalid input data", content = @Content),
            @ApiResponse(responseCode = "409", description = "Username or email already exists!", content = @Content),
            @ApiResponse(responseCode = "500", description = "Internal Server Error", content = @Content)
    })
    public ResponseEntity register(@RequestBody @Valid RegisterDTO data){
        if(this.userRepository.findByUsername(data.username()) != null) return ResponseEntity.status(HttpStatus.CONFLICT).body("Username or email already exists!");

        String encryptedPassword = new BCryptPasswordEncoder().encode(data.password());
        UserModel newUser = new UserModel(data.name(), data.username(), encryptedPassword, data.email(), data.role());

        this.userRepository.save(newUser);

        return ResponseEntity.ok().build();
    }
}