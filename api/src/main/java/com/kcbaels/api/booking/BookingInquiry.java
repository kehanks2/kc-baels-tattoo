package com.kcbaels.api.booking;

import jakarta.persistence.*;
import lombok.*;

import java.time.Instant;

@Entity
@Table(name = "booking_inquiries")
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class BookingInquiry {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(nullable = false)
    private String name;

    @Column(nullable = false)
    private String email;

    private String phone;

    @Column(nullable = false, columnDefinition = "TEXT")
    private String idea;

    @Column(nullable = false)
    private String style;

    @Column(nullable = false)
    private String placement;

    @Column(nullable = false)
    private String size;

    private String referral;

    @Column(nullable = false)
    private Instant submittedAt;
}
