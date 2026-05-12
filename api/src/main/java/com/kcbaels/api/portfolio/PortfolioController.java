package com.kcbaels.api.portfolio;

import lombok.RequiredArgsConstructor;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/portfolio")
@RequiredArgsConstructor
public class PortfolioController {

    private final PortfolioService service;

    @GetMapping
    public List<PortfolioImageResponse> getAll(
        @RequestParam(required = false) String category
    ) {
        return service.getAll(category);
    }

    @GetMapping("/homepage")
    public List<PortfolioImageResponse> getHomepage() {
        return service.getHomepage();
    }
}
