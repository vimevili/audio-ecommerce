package com.vimevili.audio_ecommerce.infra.config;

import org.springframework.boot.context.event.ApplicationReadyEvent;
import org.springframework.context.event.EventListener;
import org.springframework.stereotype.Component;

@Component
public class WelcomeLogger {

    @EventListener(ApplicationReadyEvent.class)
    public void onApplicationReady() {
        String url = "http://localhost:8080";
        String swagger = url + "/swagger-ui/index.html";

        System.out.println("=".repeat(50));
        System.out.println("🎵 AUDIO E-COMMERCE - BACKEND READY");
        System.out.println("🚀 API Base: " + "\u001B[32m" +  url);
        System.out.println("📖 Swagger:  " + "\u001B[32m" + swagger);
        System.out.println("=".repeat(50) + "\u001B[0m\n");
    }
}