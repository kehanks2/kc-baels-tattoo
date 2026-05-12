package com.kcbaels.api.portfolio;

import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
@RequiredArgsConstructor
public class PortfolioService {

    private final PortfolioRepository repository;

    public List<PortfolioImageResponse> getAll(String category) {
        List<PortfolioImage> images = (category == null || category.isBlank())
            ? repository.findAllByOrderByDisplayOrderAsc()
            : repository.findByCategoryOrderByDisplayOrderAsc(category);

        return images.stream().map(PortfolioImageResponse::from).toList();
    }

    public List<PortfolioImageResponse> getHomepage() {
        return repository.findByShowOnHomepageTrueOrderByDisplayOrderAsc()
            .stream()
            .map(PortfolioImageResponse::from)
            .toList();
    }
}
