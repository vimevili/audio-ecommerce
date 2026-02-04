package com.vimevili.audio_ecommerce.controllers;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import com.vimevili.audio_ecommerce.infra.docs.ApiGlobalErrors;
import com.vimevili.audio_ecommerce.services.UserService;

import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.media.Content;
import io.swagger.v3.oas.annotations.media.Schema;
import io.swagger.v3.oas.annotations.responses.ApiResponse;
import io.swagger.v3.oas.annotations.tags.Tag;

@RestController
@RequestMapping("/api/users")
@Tag(name = "Users", description = "Endpoints for user data validation")
@ApiGlobalErrors
public class UserController {

    @Autowired
    private UserService userService;

    @GetMapping("/check-username")
    @Operation(summary = "Check if username is already in use")
    @ApiResponse(responseCode = "200", description = "Success", 
        content = @Content(mediaType = "application/json", schema = @Schema(implementation = Boolean.class)))
    public ResponseEntity<Boolean> checkUsername(@RequestParam String username) {
        return ResponseEntity.ok(userService.isUsernameTaken(username));
    }

    @GetMapping("/check-email")
    @Operation(summary = "Check if email is already in use")
    @ApiResponse(responseCode = "200", description = "Success", 
        content = @Content(mediaType = "application/json", schema = @Schema(implementation = Boolean.class)))
    public ResponseEntity<Boolean> checkEmail(@RequestParam String email) {
        return ResponseEntity.ok(userService.isEmailTaken(email));
    }
}