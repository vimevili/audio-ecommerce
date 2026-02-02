package com.vimevili.audio_ecommerce.controllers;

import java.util.Map;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.http.HttpHeaders;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseCookie;
import org.springframework.http.ResponseEntity;
import org.springframework.security.authentication.AnonymousAuthenticationToken;
import org.springframework.security.core.context.SecurityContextHolder;
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
import com.vimevili.audio_ecommerce.dtos.user.UserResponseDTO;
import com.vimevili.audio_ecommerce.infra.docs.ApiAuthErrors;
import com.vimevili.audio_ecommerce.infra.docs.ApiGlobalErrors;
import com.vimevili.audio_ecommerce.infra.docs.ApiNotFoundResponse;
import com.vimevili.audio_ecommerce.models.UserModel;
import com.vimevili.audio_ecommerce.services.AuthService;

import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.media.Content;
import io.swagger.v3.oas.annotations.media.Schema;
import io.swagger.v3.oas.annotations.responses.ApiResponse;
import io.swagger.v3.oas.annotations.tags.Tag;
import jakarta.servlet.http.HttpServletResponse;
import jakarta.validation.Valid;

@RestController
@RequestMapping("/api/auth")
@Tag(name = "Authentication", description = "Endpoints for authentication and session management")
@ApiGlobalErrors
public class AuthController {
    
    @Autowired
    private AuthService authService;
    @Value("${app.security.cookie-secure}")
    private boolean isCookieSecure;
    @Value("${app.security.same-site}")
    private String cookieSameSite;

    @PostMapping("/login")
    @Operation(summary = "Sign In")
    @ApiAuthErrors
    @ApiResponse(responseCode = "200", description = "User successfully authenticated!", 
        content = @Content(mediaType = "application/json", schema = @Schema(implementation = String.class)))
    public ResponseEntity<String> login(@RequestBody @Valid AuthDTO data, HttpServletResponse response) {
        String token = authService.authenticateUser(data);
        ResponseCookie cookie = ResponseCookie.from("auth_token", token)
                .httpOnly(true).secure(isCookieSecure).path("/").maxAge(60 * 60 * 2).sameSite(cookieSameSite).build();
        response.addHeader(HttpHeaders.SET_COOKIE, cookie.toString());
        return ResponseEntity.ok("Login successful!");
    }

    @PostMapping("/register")
    @Operation(summary = "Sign Up")
    @ApiResponse(responseCode = "201", description = "User successfully created!", 
        content = @Content(mediaType = "application/json", schema = @Schema(implementation = String.class)))
    @ApiResponse(responseCode = "409", description = "Username or email already exists!", content = @Content) // Específico daqui
    public ResponseEntity<String> register(@RequestBody @Valid RegisterDTO data) {
        authService.registerUser(data);
        return ResponseEntity.status(HttpStatus.CREATED).body("Registration successful! Check your email.");
    }   
    
    @GetMapping("/confirm")
    @Operation(summary = "Confirm Account")
    @ApiNotFoundResponse
    @ApiResponse(responseCode = "200", description = "Account successfully activated!", 
        content = @Content(mediaType = "application/json", schema = @Schema(implementation = String.class)))
    public ResponseEntity<String> confirmAccount(@RequestParam String token) {
        authService.confirmAccount(token);
        return ResponseEntity.ok("Account activated successfully!");
    }

    @PostMapping("/forgot-password")
    @Operation(summary = "Request Password Reset")
    @ApiResponse(responseCode = "200", description = "Reset link process initiated", 
        content = @Content(mediaType = "application/json", schema = @Schema(implementation = String.class)))
    public ResponseEntity<String> forgotPassword(@RequestBody @Valid ForgotPasswordDTO request) {
        authService.processForgotPassword(request.email());
        return ResponseEntity.ok("If the email exists, a reset link has been sent.");
    }

    @PostMapping("/reset-password")
    @Operation(summary = "Reset Password")
    @ApiNotFoundResponse
    @ApiResponse(responseCode = "200", description = "Password successfully updated!", 
        content = @Content(mediaType = "application/json", schema = @Schema(implementation = String.class)))
    public ResponseEntity<String> resetPassword(@RequestBody @Valid ResetPasswordDTO request) {
        authService.resetPassword(request);
        return ResponseEntity.ok("Password changed successfully!");
    }

    @GetMapping("/me")
    @Operation(summary = "Get Current User")
    @ApiAuthErrors 
    @ApiResponse(responseCode = "200", description = "User details returned", 
        content = @Content(mediaType = "application/json", schema = @Schema(implementation = UserResponseDTO.class)))
    public ResponseEntity<UserResponseDTO> getCurrentUser() {
        var auth = SecurityContextHolder.getContext().getAuthentication();
        if (auth == null || !auth.isAuthenticated() || auth instanceof AnonymousAuthenticationToken) {
            return ResponseEntity.status(HttpStatus.UNAUTHORIZED).build();
        }
        UserModel user = (UserModel) auth.getPrincipal();
        return ResponseEntity.ok(new UserResponseDTO(user.getName(), user.getPicture(), user.getUsername(), user.getEmail(), user.getRole()));
    }

    @PostMapping("/logout")
    @Operation(summary = "Sign Out")
    @ApiResponse(responseCode = "200", description = "Logged out successfully")
    public ResponseEntity<Void> logout(HttpServletResponse response) {
        ResponseCookie cookie = ResponseCookie.from("auth_token", "")
                .httpOnly(true).secure(isCookieSecure).path("/").maxAge(0).sameSite(cookieSameSite).build();
        response.addHeader(HttpHeaders.SET_COOKIE, cookie.toString());
        return ResponseEntity.ok().build();
    }

    @PostMapping("/resend-confirmation")
    @Operation(summary = "Resend Confirmation Email")
    @ApiResponse(responseCode = "201", description = "Confirmation e-mail successfully sent!")
    public ResponseEntity<Void> resendConfirmation(@RequestBody Map<String, String> payload) {
        authService.resendConfirmationEmail(payload.get("email")); 
        return ResponseEntity.ok().build();
}
}