package com.kcbaels.api.notification;

import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.mail.javamail.JavaMailSender;
import org.springframework.mail.javamail.MimeMessageHelper;
import org.springframework.scheduling.annotation.Async;
import org.springframework.stereotype.Service;

@Slf4j
@Service
@RequiredArgsConstructor
public class EmailService {

    private final JavaMailSender mailSender;

    @Value("${mail.from}")
    private String from;

    @Value("${mail.owner}")
    private String ownerEmail;

    @Async
    public void sendContactNotification(String name, String email, String topic, String message) {
        if (ownerEmail == null || ownerEmail.isBlank()) {
            log.warn("OWNER_EMAIL not configured — skipping contact notification email");
            return;
        }
        send(ownerEmail, email,
                "New Contact Message – " + topic,
                contactOwnerBody(name, email, topic, message));
        send(email, null,
                "We received your message – KC Baels Tattoo",
                contactAutoReply(name));
    }

    @Async
    public void sendBookingNotification(String name, String email, String phone,
                                        String style, String placement, String size,
                                        String referral, String idea) {
        if (ownerEmail == null || ownerEmail.isBlank()) {
            log.warn("OWNER_EMAIL not configured — skipping booking notification email");
            return;
        }
        send(ownerEmail, email,
                "New Booking Request – " + style + " from " + name,
                bookingOwnerBody(name, email, phone, style, placement, size, referral, idea));
        send(email, null,
                "Booking Request Received – KC Baels Tattoo",
                bookingAutoReply(name));
    }

    private void send(String to, String replyTo, String subject, String body) {
        try {
            var msg = mailSender.createMimeMessage();
            var helper = new MimeMessageHelper(msg, false, "UTF-8");
            helper.setFrom(from);
            helper.setTo(to);
            if (replyTo != null) helper.setReplyTo(replyTo);
            helper.setSubject(subject);
            helper.setText(body, false);
            mailSender.send(msg);
        } catch (Exception e) {
            log.error("Failed to send email to {}: {}", to, e.getMessage());
        }
    }

    private String contactOwnerBody(String name, String email, String topic, String message) {
        return """
                New contact form submission

                Name:    %s
                Email:   %s
                Topic:   %s

                Message:
                %s
                """.formatted(name, email, topic, message);
    }

    private String contactAutoReply(String name) {
        return """
                Hi %s,

                Thanks for reaching out! KC will get back to you as soon as possible.

                — KC Baels Tattoo
                """.formatted(name);
    }

    private String bookingOwnerBody(String name, String email, String phone,
                                    String style, String placement, String size,
                                    String referral, String idea) {
        return """
                New booking inquiry

                Name:      %s
                Email:     %s
                Phone:     %s
                Style:     %s
                Placement: %s
                Size:      %s
                Referral:  %s

                Idea:
                %s
                """.formatted(name, email,
                phone != null ? phone : "—",
                style, placement, size,
                referral != null ? referral : "—",
                idea);
    }

    private String bookingAutoReply(String name) {
        return """
                Hi %s,

                Thanks for your booking inquiry! KC reviews all requests personally and will reach out soon.

                — KC Baels Tattoo
                """.formatted(name);
    }
}
