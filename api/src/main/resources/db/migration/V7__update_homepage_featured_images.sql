-- Rename tiger image and update homepage featured set
UPDATE portfolio_images
SET title = 'Japanese Tiger',
    alt_text = 'Traditional Japanese style tiger tattoo'
WHERE image_url = '/assets/portfolio/images/tiger.jpg';

-- Clear all homepage flags
UPDATE portfolio_images SET show_on_homepage = false;

-- Set featured images in desired homepage order: Tiger → Sacred Heart → Manga Panel → Flail
UPDATE portfolio_images SET show_on_homepage = true, display_order = 1 WHERE image_url = '/assets/portfolio/images/tiger.jpg';
UPDATE portfolio_images SET show_on_homepage = true, display_order = 2 WHERE image_url = '/assets/portfolio/images/sacred-heart.jpg';
UPDATE portfolio_images SET show_on_homepage = true, display_order = 3 WHERE image_url = '/assets/portfolio/images/anime-panel.png';
UPDATE portfolio_images SET show_on_homepage = true, display_order = 4 WHERE image_url = '/assets/portfolio/images/flail.png';
