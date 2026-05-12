package com.kcbaels.api.portfolio;

import jakarta.persistence.*;
import lombok.*;

import java.time.Instant;

@Entity
@Table(name = "portfolio_images")
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class PortfolioImage {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(nullable = false)
    private String imageUrl;

    @Column(nullable = false)
    private String altText;

    private String title;

    @Column(nullable = false)
    private String category;

    @Column(nullable = false)
    private boolean showOnHomepage;

    @Column(nullable = false)
    private int displayOrder;

    @Column(nullable = false)
    private int width;

    @Column(nullable = false)
    private int height;

    @Column(nullable = false)
    private Instant uploadedAt;
}
