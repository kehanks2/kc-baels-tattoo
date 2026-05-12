package com.kcbaels.api.contact;

import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import java.time.Instant;

@Service
@RequiredArgsConstructor
public class ContactService {

    private final ContactRepository repository;

    public void submit(ContactRequest request) {
        repository.save(ContactSubmission.builder()
            .name(request.name())
            .email(request.email())
            .topic(request.topic())
            .message(request.message())
            .submittedAt(Instant.now())
            .build());
    }
}
