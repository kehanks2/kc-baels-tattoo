package com.kcbaels.api.booking;

import com.kcbaels.api.notification.EmailService;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.time.Instant;

@Service
@RequiredArgsConstructor
public class BookingService {

    private final BookingRepository repository;
    private final EmailService emailService;

    public void submit(BookingRequest request) {
        repository.save(BookingInquiry.builder()
            .name(request.name())
            .email(request.email())
            .phone(request.phone())
            .idea(request.idea())
            .style(request.style())
            .placement(request.placement())
            .size(request.size())
            .referral(request.referral())
            .submittedAt(Instant.now())
            .build());

        emailService.sendBookingNotification(
            request.name(), request.email(), request.phone(),
            request.style(), request.placement(), request.size(),
            request.referral(), request.idea());
    }
}
