package com.kcbaels.api.portfolio;

import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface PortfolioRepository extends JpaRepository<PortfolioImage, Long> {

    List<PortfolioImage> findAllByOrderByDisplayOrderAsc();

    List<PortfolioImage> findByCategoryOrderByDisplayOrderAsc(String category);

    List<PortfolioImage> findByShowOnHomepageTrueOrderByDisplayOrderAsc();
}
