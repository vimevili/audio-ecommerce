package com.vimevili.audio_ecommerce.controllers;


import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.http.HttpHeaders;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseCookie;
import org.springframework.http.ResponseEntity;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.BadCredentialsException;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import com.vimevili.audio_ecommerce.dtos.tokens.ForgotPasswordDTO;
import com.vimevili.audio_ecommerce.dtos.tokens.ResetPasswordDTO;
import com.vimevili.audio_ecommerce.dtos.user.AuthDTO;
import com.vimevili.audio_ecommerce.dtos.user.RegisterDTO;
import com.vimevili.audio_ecommerce.infra.security.TokenService;
import com.vimevili.audio_ecommerce.models.PasswordResetToken;
import com.vimevili.audio_ecommerce.models.UserModel;
import com.vimevili.audio_ecommerce.models.VerificationToken;
import com.vimevili.audio_ecommerce.respositories.PasswordResetTokenRepository;
import com.vimevili.audio_ecommerce.respositories.UserRepository;
import com.vimevili.audio_ecommerce.respositories.VerificationTokenRepository;
import com.vimevili.audio_ecommerce.services.AuthService;
import com.vimevili.audio_ecommerce.services.EmailService;

import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.media.Content;
import io.swagger.v3.oas.annotations.responses.ApiResponse;
import io.swagger.v3.oas.annotations.responses.ApiResponses;
import io.swagger.v3.oas.annotations.tags.Tag;
import jakarta.servlet.http.HttpServletResponse;
import jakarta.validation.Valid;

@RestController
@RequestMapping("/api/auth")
@Tag(name = "Authentication", description = "Endpoints for authentication")
public class AuthController {
    @Autowired
    private AuthenticationManager authenticationManager;
    @Autowired
    private UserRepository userRepository;
    @Autowired
    private TokenService tokenService;
    @Autowired
    private VerificationTokenRepository tokenRepository;
    @Autowired
    private PasswordResetTokenRepository passwordResetTokenRepository;
    @Autowired
    private EmailService emailService;
    @Autowired
    private AuthService authService;
    @Autowired
    private PasswordEncoder passwordEncoder;

    @Value("${app.security.cookie-secure}")
    private boolean isCookieSecure;

    @Value("${app.security.same-site}")
    private String cookieSameSite;

    @PostMapping("/login")
    @Operation(summary = "Sign In", description = "Return a JWT token if the credentials are valid")
    @ApiResponses(value = {
        @ApiResponse(responseCode = "200", description = "User successfully authenticated!", content = @Content),
        @ApiResponse(responseCode = "401", description = "Either the username or password you are trying to log in with are incorrect!", content = @Content),
        @ApiResponse(responseCode = "500", description = "Internal Server Error", content = @Content)
    })
    public ResponseEntity login(@RequestBody @Valid AuthDTO data, HttpServletResponse response){
        try {
            var usernamePassword = new UsernamePasswordAuthenticationToken(data.login(), data.password());
            var auth = this.authenticationManager.authenticate(usernamePassword);

            var token = tokenService.generateToken((UserModel) auth.getPrincipal());

            ResponseCookie cookie = ResponseCookie.from("auth_token", token)
                .httpOnly(true)          
                .secure(isCookieSecure) 
                .path("/")               
                .maxAge(60 * 60 * 2)    // Expira em 2 horas
                .sameSite(cookieSameSite)         
                .build();

            response.addHeader(HttpHeaders.SET_COOKIE, cookie.toString());
            
            return ResponseEntity.ok("Login successful!");

        } catch (BadCredentialsException e) {
            return ResponseEntity.status(HttpStatus.UNAUTHORIZED).body("Either the username or password you are trying to log in with are incorrect");
        }
    }

    @PostMapping("/register")
    @ApiResponses(value = {
            @ApiResponse(responseCode = "201", description = "User successfully created!", content = @Content),
            @ApiResponse(responseCode = "400", description = "Invalid input data", content = @Content),
            @ApiResponse(responseCode = "409", description = "Username or email already exists!", content = @Content),
            @ApiResponse(responseCode = "500", description = "Internal Server Error", content = @Content)
    })

    public ResponseEntity register(@RequestBody @Valid RegisterDTO data){
    if(this.userRepository.findByUsernameOrEmail(data.username(), data.email()) != null) {
        return ResponseEntity.status(HttpStatus.CONFLICT).body("Username or email already exists!");
    }

    String encryptedPassword = new BCryptPasswordEncoder().encode(data.password());
    UserModel newUser = new UserModel(data.name(), data.username(), encryptedPassword, data.email(), data.role());
    this.userRepository.save(newUser);
    
    VerificationToken vToken = new VerificationToken( newUser);
    this.tokenRepository.save(vToken);

    emailService.sendVerificationEmail(newUser, vToken.getToken());

    return ResponseEntity.status(HttpStatus.CREATED).build();
    }

    @GetMapping("/confirm")
    @Operation(summary = "Confirm Account", description = "Activates an user account using the verification token sent via email")
    @ApiResponses(value = {
        @ApiResponse(responseCode = "200", description = "Account successfully activated!", content = @Content),
        @ApiResponse(responseCode = "400", description = "Invalid or expired token", content = @Content),
        @ApiResponse(responseCode = "404", description = "Token not found", content = @Content)
    })
    public ResponseEntity<String> confirmAccount(@RequestParam("token") String token) {
        VerificationToken verificationToken = tokenRepository.findByToken(token);

        if (verificationToken == null) {
            return ResponseEntity.status(HttpStatus.NOT_FOUND).body("Token não encontrado ou inválido.");
        }

        if (verificationToken.getExpiryDate().isBefore(java.time.LocalDateTime.now())) {
            tokenRepository.delete(verificationToken);
            return ResponseEntity.status(HttpStatus.BAD_REQUEST).body("Este link de confirmação expirou. Por favor, registre-se novamente.");
        }

        UserModel user = verificationToken.getUser();
        user.setEnabled(true);
        userRepository.save(user);

        tokenRepository.delete(verificationToken);

        return ResponseEntity.ok("Conta ativada com sucesso! Você já pode fazer login no Audio E-commerce.");
    }

    @PostMapping("/forgot-password")
    @Operation(summary = "Request Password Reset", description = "Sends a recovery link to the user's email if it exists in the database")
    @ApiResponses(value = {
            @ApiResponse(responseCode = "200", description = "If the email exists, a reset link has been sent.", content = @Content)
    })
    public ResponseEntity<String> forgotPassword(@RequestBody @Valid ForgotPasswordDTO request) {
        authService.processForgotPassword(request.email());

        return ResponseEntity.ok("Se o e-mail informado estiver cadastrado, você receberá um link de recuperação em instantes.");
    }

    @PostMapping("/reset-password")
    @Operation(summary = "Reset Password", description = "Updates the user's password using a valid reset token")
    @ApiResponses(value = {
            @ApiResponse(responseCode = "200", description = "Password successfully updated!", content = @Content),
            @ApiResponse(responseCode = "400", description = "Invalid or expired token", content = @Content),
            @ApiResponse(responseCode = "404", description = "Token not found", content = @Content)
    })
    public ResponseEntity<String> resetPassword(@RequestBody @Valid ResetPasswordDTO request) {
        Optional<PasswordResetToken> resetTokenOpt = passwordResetTokenRepository.findByToken(request.token());

        if (resetTokenOpt.isEmpty()) {
            return ResponseEntity.status(HttpStatus.NOT_FOUND).body("Token de recuperação não encontrado.");
        }

        PasswordResetToken resetToken = resetTokenOpt.get();

        if (resetToken.getExpiryDate().isBefore(java.time.LocalDateTime.now())) {
            passwordResetTokenRepository.delete(resetToken);
            return ResponseEntity.status(HttpStatus.BAD_REQUEST).body("Este link de recuperação expirou. Solicite um novo.");
        }

        UserModel user = resetToken.getUser();
        user.setPassword(passwordEncoder.encode(request.newPassword()));
        userRepository.save(user);

        passwordResetTokenRepository.delete(resetToken);

        return ResponseEntity.ok("Senha alterada com sucesso! Você já pode fazer login com suas novas credenciais.");
    }
}