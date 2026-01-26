package com.vimevili.audio_ecommerce.services;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.mail.SimpleMailMessage;
import org.springframework.mail.javamail.JavaMailSender;
import org.springframework.stereotype.Service;

import com.vimevili.audio_ecommerce.models.UserModel;

@Service
public class EmailService {

    @Autowired
    private JavaMailSender mailSender;

    @Value("${app.email.from}")
    private String fromEmail;

    public void sendVerificationEmail(UserModel user, String token) {
        try {
        SimpleMailMessage message = new SimpleMailMessage();
        message.setFrom(fromEmail);
        message.setTo(user.getEmail());
        message.setSubject("Confirme sua conta");
        message.setText("Link: http://localhost:8080/api/auth/confirm?token=" + token);
        
        mailSender.send(message);
    } catch (Exception e) {
        System.err.println("ERRO AO ENVIAR E-MAIL: " + e.getMessage());
        e.printStackTrace();
    }
    }
}

