package com.kcbaels.api.portfolio;

public record PortfolioImageResponse(
    Long id,
    String imageUrl,
    String altText,
    String title,
    String category,
    boolean showOnHomepage,
    int displayOrder,
    int width,
    int height
) {
    static PortfolioImageResponse from(PortfolioImage image) {
        return new PortfolioImageResponse(
            image.getId(),
            image.getImageUrl(),
            image.getAltText(),
            image.getTitle(),
            image.getCategory(),
            image.isShowOnHomepage(),
            image.getDisplayOrder(),
            image.getWidth(),
            image.getHeight()
        );
    }
}
