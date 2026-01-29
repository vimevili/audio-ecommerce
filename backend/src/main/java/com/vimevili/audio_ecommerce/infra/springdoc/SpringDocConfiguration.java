package com.vimevili.audio_ecommerce.infra.springdoc;

import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;

import io.swagger.v3.oas.models.OpenAPI;
import io.swagger.v3.oas.models.info.Contact;
import io.swagger.v3.oas.models.info.Info;

@Configuration
public class SpringDocConfiguration {

    @Bean
    public OpenAPI customOpenAPI() {
        return new OpenAPI()
                .info(new Info()
                        .title("Audio App API")
                        .description("Audio API Rest - Autenticação baseada em Cookies (HttpOnly)")
                        .contact(new Contact()
                                .name("Vinicius Meirelles Coelho")
                                .email("vinicius_meirelles@outlook.com.br"))
                        .version("1.0.0"));
    }
}