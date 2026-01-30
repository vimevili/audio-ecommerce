package com.vimevili.audio_ecommerce.infra.docs;

import com.vimevili.audio_ecommerce.dtos.errors.StandardErrorInfo;
import io.swagger.v3.oas.annotations.media.Content;
import io.swagger.v3.oas.annotations.media.Schema;
import io.swagger.v3.oas.annotations.responses.ApiResponse;
import io.swagger.v3.oas.annotations.responses.ApiResponses;
import java.lang.annotation.*;

@Target({ElementType.METHOD, ElementType.TYPE})
@Retention(RetentionPolicy.RUNTIME)
@ApiResponses({
    @ApiResponse(responseCode = "400", description = "Invalid Request / Validation Error", 
        content = @Content(mediaType = "application/json", schema = @Schema(implementation = StandardErrorInfo.class))),
    @ApiResponse(responseCode = "500", description = "Internal Server Error", 
        content = @Content(mediaType = "application/json", schema = @Schema(implementation = StandardErrorInfo.class)))
})
public @interface ApiGlobalErrors {}