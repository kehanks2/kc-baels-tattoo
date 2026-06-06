package com.kcbaels.api.notification;

import com.sendgrid.Method;
import com.sendgrid.Request;
import com.sendgrid.SendGrid;
import com.sendgrid.helpers.mail.Mail;
import com.sendgrid.helpers.mail.objects.Content;
import com.sendgrid.helpers.mail.objects.Email;
import com.sendgrid.helpers.mail.objects.Personalization;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Service;

@Slf4j
@Service
public class EmailService {

    private final SendGrid sendGrid;
    private final String from;
    private final String ownerEmail;

    public EmailService(
            @Value("${mail.api-key}") String apiKey,
            @Value("${mail.from}") String from,
            @Value("${mail.owner}") String ownerEmail) {
        this.sendGrid = new SendGrid(apiKey);
        this.from = from;
        this.ownerEmail = ownerEmail;
    }

    public void sendContactNotification(String name, String email, String topic, String message) {
        if (ownerEmail == null || ownerEmail.isBlank()) {
            log.warn("OWNER_EMAIL not configured — skipping contact notification email");
            return;
        }
        send(ownerEmail, email, "New Contact Message – " + topic,
                contactOwnerBody(name, email, topic, message));
        send(email, null, "We received your message – Baels Tattoo",
                contactAutoReply(name));
    }

    public void sendBookingNotification(String name, String email, String phone,
                                        String style, String placement, String size,
                                        String referral, String idea) {
        if (ownerEmail == null || ownerEmail.isBlank()) {
            log.warn("OWNER_EMAIL not configured — skipping booking notification email");
            return;
        }
        send(ownerEmail, email, "New Booking Request – " + style + " from " + name,
                bookingOwnerBody(name, email, phone, style, placement, size, referral, idea));
        send(email, null, "Booking Request Received – Baels Tattoo",
                bookingAutoReply(name));
    }

    private void send(String to, String replyTo, String subject, String body) {
        try {
            Mail mail = new Mail();
            mail.setFrom(new Email(from, "Baels Tattoo"));
            mail.setSubject(subject);

            Personalization personalization = new Personalization();
            personalization.addTo(new Email(to));
            if (replyTo != null) mail.setReplyTo(new Email(replyTo));
            mail.addPersonalization(personalization);
            mail.addContent(new Content("text/plain", body));

            Request request = new Request();
            request.setMethod(Method.POST);
            request.setEndpoint("mail/send");
            request.setBody(mail.build());

            var response = sendGrid.api(request);
            if (response.getStatusCode() >= 400) {
                log.error("SendGrid rejected email to {}: {} {}", to, response.getStatusCode(), response.getBody());
            } else {
                log.info("Email sent to {} (status {})", to, response.getStatusCode());
            }
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

                Thanks for reaching out! Baels will get back to you as soon as possible.

                — Baels Tattoo
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

                Thanks for your booking inquiry! I review all requests personally and will reach out soon.

                — Baels Tattoo
                """.formatted(name);
    }
}
