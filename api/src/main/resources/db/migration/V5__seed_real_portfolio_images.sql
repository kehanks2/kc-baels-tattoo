-- Replace placeholder seed data with real client portfolio images
TRUNCATE TABLE portfolio_images RESTART IDENTITY;

INSERT INTO portfolio_images (image_url, alt_text, title, category, show_on_homepage, display_order, width, height) VALUES
    -- black-grey (4)
    ('/assets/portfolio/images/koi.jpg',        'Black and grey koi fish with lotus flower sleeve tattoo',        'Koi & Lotus',         'black-grey', true,  1, 1080, 1350),
    ('/assets/portfolio/images/jellyfish.jpg',  'Black and grey jellyfish with fine detailed linework tattoo',    'Jellyfish',           'black-grey', true,  2, 1080, 1350),
    ('/assets/portfolio/images/anime-panel.png','Black and grey manga anime panel sleeve tattoo',                 'Manga Panel',         'black-grey', false, 3, 1080, 1350),
    ('/assets/portfolio/images/joker.png',      'Black and grey joker playing card figure tattoo',                'Joker',               'black-grey', false, 4, 1080, 1350),

    -- color (16)
    ('/assets/portfolio/images/heart.jpg',         'Neotraditional anatomical heart tattoo in deep red',             'Anatomical Heart',    'color', true,  1, 1080, 1350),
    ('/assets/portfolio/images/cat-butterfly.jpg', 'Traditional color cat butterfly hybrid tattoo',                  'Cat Butterfly',       'color', true,  2, 1762, 2203),
    ('/assets/portfolio/images/tiger.jpg',         'Traditional Japanese style fighting tigers tattoo',               'Fighting Tigers',     'color', true,  3, 1080, 1350),
    ('/assets/portfolio/images/spider-lilies.jpg', 'Fine line red spider lily thigh tattoo',                         'Spider Lilies',       'color', true,  4, 3237, 4316),
    ('/assets/portfolio/images/snake.jpg',         'Traditional color snake with pink flowers tattoo',                'Snake & Flowers',     'color', false, 5, 1739, 1739),
    ('/assets/portfolio/images/dagger.jpg',        'Neotraditional dagger with tulip flowers tattoo',                 'Floral Dagger',       'color', false, 6, 2024, 2024),
    ('/assets/portfolio/images/skull.jpg',         'Traditional color skull with butterfly and mushroom tattoo',      'Skull & Butterfly',   'color', false, 7, 1080, 1350),
    ('/assets/portfolio/images/flying-pig.jpg',    'Traditional flying pig with angel wings tattoo',                  'Flying Pig',          'color', false, 8, 1080, 1350),
    ('/assets/portfolio/images/sacred-heart.jpg',  'Traditional sacred heart skull with flames and gold frame tattoo','Sacred Heart',        'color', false, 9, 1080, 1350),
    ('/assets/portfolio/images/dagger-heart.png',  'Traditional flaming sacred heart pierced by dagger tattoo',      'Dagger & Heart',      'color', false, 10, 1080, 1350),
    ('/assets/portfolio/images/crab.png',          'Traditional color crab tattoo with teal and yellow',              'Traditional Crab',    'color', false, 11, 1080, 1350),
    ('/assets/portfolio/images/flail.png',         'Traditional color flail weapon tattoo',                           'Flail',               'color', false, 12, 1080, 1350),
    ('/assets/portfolio/images/spongebob.jpg',     'Color SpongeBob SquarePants and Patrick Star tattoo',             'SpongeBob & Patrick', 'color', false, 13, 1080, 1350),
    ('/assets/portfolio/images/mushroom-skull.png','Color neotraditional mushroom skull neck tattoo',                 'Mushroom Skull',      'color', false, 14, 1080, 1350),
    ('/assets/portfolio/images/bulbasaur.png',     'Color Bulbasaur Pokemon with Halloween jack-o-lantern tattoo',   'Halloween Bulbasaur', 'color', false, 15, 1080, 1350),
    ('/assets/portfolio/images/hummingbird.png',   'Color illustrative hummingbird tattoo',                           'Hummingbird',         'color', false, 16, 1080, 1350);
