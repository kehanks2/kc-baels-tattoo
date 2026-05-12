package com.kcbaels.api.contact;

import jakarta.validation.constraints.*;

public record ContactRequest(
    @NotBlank String name,
    @NotBlank @Email String email,
    @NotBlank String topic,
    @NotBlank @Size(min = 10) String message
) {}
