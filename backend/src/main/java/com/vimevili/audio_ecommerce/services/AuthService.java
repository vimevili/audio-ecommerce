package com.vimevili.audio_ecommerce.services;

import java.util.UUID;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.context.annotation.Lazy;
import org.springframework.mail.SimpleMailMessage;
import org.springframework.mail.javamail.JavaMailSender;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import com.vimevili.audio_ecommerce.dtos.tokens.ResetPasswordDTO;
import com.vimevili.audio_ecommerce.dtos.user.AuthDTO;
import com.vimevili.audio_ecommerce.dtos.user.RegisterDTO;
import com.vimevili.audio_ecommerce.exceptions.UserAlreadyExistsException;
import com.vimevili.audio_ecommerce.infra.security.TokenService;
import com.vimevili.audio_ecommerce.models.PasswordResetToken;
import com.vimevili.audio_ecommerce.models.UserModel;
import com.vimevili.audio_ecommerce.models.VerificationToken;
import com.vimevili.audio_ecommerce.respositories.PasswordResetTokenRepository;
import com.vimevili.audio_ecommerce.respositories.UserRepository;
import com.vimevili.audio_ecommerce.respositories.VerificationTokenRepository;

import jakarta.transaction.Transactional;

@Service
public class AuthService implements UserDetailsService {

    @Autowired
    private UserRepository userRepository;
    
    @Autowired
    private VerificationTokenRepository tokenRepository;

    @Autowired
    private PasswordResetTokenRepository passwordResetRepository;

    @Autowired
    private JavaMailSender mailSender;

    @Autowired
    private PasswordEncoder passwordEncoder;
    
    @Autowired
    private EmailService emailService;

    @Autowired
    private TokenService tokenService;

    @Autowired private 
    PasswordResetTokenRepository passwordResetTokenRepository;

    @Autowired
    @Lazy
    private AuthenticationManager authenticationManager;

    @Override
    public UserDetails loadUserByUsername(String identifier) throws UsernameNotFoundException {
        return userRepository.findByUsernameOrEmail(identifier, identifier);
    }
    
    @Value("${app.url.frontend}")
    private String frontendUrl ;

    @Transactional
    public void processForgotPassword(String email) {
        UserModel user = userRepository.findByEmail(email)
                .orElseThrow(() -> new RuntimeException("User not found!"));

        passwordResetRepository.deleteByUser(user);

        String token = UUID.randomUUID().toString();
        PasswordResetToken resetToken = new PasswordResetToken(token, user);

        passwordResetRepository.save(resetToken);

        String resetUrl = frontendUrl + "/reset-password?token=" + token;
        sendEmail(user.getEmail(), resetUrl);
    }

    private void sendEmail(String email, String link) {
        SimpleMailMessage message = new SimpleMailMessage();
        message.setTo(email);
        message.setSubject("Password Reset - Audio App");
        message.setText("Click on the link to reset your password: " + link);
        mailSender.send(message);
    }

    @Transactional 
    public void registerUser(RegisterDTO data) {
        if (userRepository.findByUsernameOrEmail(data.username(), data.email()) != null) {
            throw new UserAlreadyExistsException("Username or email already exists!");
        }

        String encryptedPassword = passwordEncoder.encode(data.password());
        UserModel newUser = new UserModel(
            data.name(), 
            data.username(), 
            encryptedPassword, 
            data.email(), 
            data.role()
        );
        userRepository.save(newUser);

        VerificationToken vToken = new VerificationToken(newUser);
        tokenRepository.save(vToken);

        emailService.sendVerificationEmail(newUser, vToken.getToken());
    }

    @Transactional
    public void confirmAccount(String token) {
        VerificationToken verificationToken = tokenRepository.findByToken(token);
        if (verificationToken == null) throw new RuntimeException("Token not found or invalid.");
        
        if (verificationToken.getExpiryDate().isBefore(java.time.LocalDateTime.now())) {
            tokenRepository.delete(verificationToken);
            throw new RuntimeException("Confirmation link expired.");
        }

        UserModel user = verificationToken.getUser();
        user.setEnabled(true);
        userRepository.save(user);
        tokenRepository.delete(verificationToken);
    }

    @Transactional
    public void resetPassword(ResetPasswordDTO request) {
        PasswordResetToken resetToken = passwordResetTokenRepository.findByToken(request.token())
                .orElseThrow(() -> new RuntimeException("Token not found."));

        if (resetToken.getExpiryDate().isBefore(java.time.LocalDateTime.now())) {
            passwordResetTokenRepository.delete(resetToken);
            throw new RuntimeException("Recovery link expired.");
        }

        UserModel user = resetToken.getUser();
        user.setPassword(passwordEncoder.encode(request.newPassword()));
        userRepository.save(user);
        passwordResetTokenRepository.delete(resetToken);
    }

    public String authenticateUser(AuthDTO data) {
        var usernamePassword = new UsernamePasswordAuthenticationToken(data.login(), data.password());
        var auth = this.authenticationManager.authenticate(usernamePassword);

        return tokenService.generateToken((UserModel) auth.getPrincipal());
    }
}
