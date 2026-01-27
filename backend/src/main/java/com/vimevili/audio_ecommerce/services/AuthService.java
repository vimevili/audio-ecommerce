package com.vimevili.audio_ecommerce.services;

import com.vimevili.audio_ecommerce.models.PasswordResetToken;
import com.vimevili.audio_ecommerce.models.UserModel;
import com.vimevili.audio_ecommerce.respositories.PasswordResetTokenRepository;
import com.vimevili.audio_ecommerce.respositories.VerificationTokenRepository;
import com.vimevili.audio_ecommerce.respositories.UserRepository;
import jakarta.transaction.Transactional;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.mail.SimpleMailMessage;
import org.springframework.mail.javamail.JavaMailSender;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.stereotype.Service;

import java.util.UUID;

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
    
    @Override
    public UserDetails loadUserByUsername(String identifier) throws UsernameNotFoundException {
        return userRepository.findByUsernameOrEmail(identifier, identifier);
    }
    
    @Value("${app.url.frontend}")
    private String frontendUrl ;

    @Transactional
    public void processForgotPassword(String email) {
        UserModel user = userRepository.findByEmail(email)
                .orElseThrow(() -> new RuntimeException("Usuário não encontrado"));

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
        message.setSubject("Recuperação de Senha - Audio App");
        message.setText("Clique no link para resetar sua senha: " + link);
        mailSender.send(message);
    }
}
