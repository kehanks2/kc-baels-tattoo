package com.kcbaels.api.booking;

import jakarta.validation.constraints.Email;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.Size;

public record BookingRequest(
    @NotBlank String name,
    @NotBlank @Email String email,
    String phone,
    @NotBlank @Size(min = 10) String idea,
    @NotBlank String style,
    @NotBlank String placement,
    @NotBlank String size,
    String referral
) {}
