CREATE TABLE portfolio_images (
    id               BIGSERIAL PRIMARY KEY,
    image_url        VARCHAR(1000) NOT NULL,
    alt_text         VARCHAR(500)  NOT NULL,
    title            VARCHAR(255),
    category         VARCHAR(50)   NOT NULL,
    show_on_homepage BOOLEAN       NOT NULL DEFAULT FALSE,
    display_order    INT           NOT NULL DEFAULT 0,
    width            INT           NOT NULL DEFAULT 600,
    height           INT           NOT NULL DEFAULT 800,
    uploaded_at      TIMESTAMPTZ   NOT NULL DEFAULT NOW()
);

-- Placeholder seed data — replace with real images via admin upload
INSERT INTO portfolio_images (image_url, alt_text, title, category, show_on_homepage, display_order, width, height) VALUES
    ('https://picsum.photos/seed/kct01/600/800', 'Black and grey wolf portrait tattoo',          'Wolf Portrait',      'black-grey',  true,  1, 600, 800),
    ('https://picsum.photos/seed/kct02/600/750', 'Realistic black and grey rose tattoo',          'Midnight Rose',      'black-grey',  false, 2, 600, 750),
    ('https://picsum.photos/seed/kct03/600/900', 'Black and grey sleeve detail',                  'Sleeve Detail',      'black-grey',  false, 3, 600, 900),
    ('https://picsum.photos/seed/kct04/600/680', 'Black and grey portrait tattoo',                'Portrait Study',     'black-grey',  false, 4, 600, 680),
    ('https://picsum.photos/seed/kct05/600/820', 'Black and grey eagle tattoo',                   'Eagle',              'black-grey',  false, 5, 600, 820),
    ('https://picsum.photos/seed/kct06/600/720', 'Vibrant color koi fish tattoo',                 'Koi',                'color',       true,  1, 600, 720),
    ('https://picsum.photos/seed/kct07/600/800', 'Watercolor butterfly tattoo',                   'Watercolor Butterfly','color',      false, 2, 600, 800),
    ('https://picsum.photos/seed/kct08/600/620', 'Color floral bouquet tattoo',                   'Garden Bouquet',     'color',       false, 3, 600, 620),
    ('https://picsum.photos/seed/kct09/600/760', 'Tropical color sleeve tattoo',                  'Tropical Sleeve',    'color',       false, 4, 600, 760),
    ('https://picsum.photos/seed/kct10/600/840', 'Fine line botanical illustration tattoo',        'Botanical',          'fine-line',   true,  1, 600, 840),
    ('https://picsum.photos/seed/kct11/600/700', 'Delicate fine line butterfly tattoo',           'Delicate Wings',     'fine-line',   false, 2, 600, 700),
    ('https://picsum.photos/seed/kct12/600/860', 'Fine line script and floral tattoo',            'Script & Florals',   'fine-line',   false, 3, 600, 860),
    ('https://picsum.photos/seed/kct13/600/700', 'Traditional American eagle and banner tattoo',  'Eagle & Banner',     'traditional', false, 1, 600, 700),
    ('https://picsum.photos/seed/kct14/600/800', 'Traditional anchor tattoo',                     'Anchor',             'traditional', false, 2, 600, 800),
    ('https://picsum.photos/seed/kct15/600/660', 'Traditional panther tattoo',                    'Panther',            'traditional', false, 3, 600, 660),
    ('https://picsum.photos/seed/kct16/600/800', 'Sacred geometry mandala tattoo',                'Mandala',            'geometric',   true,  1, 600, 800),
    ('https://picsum.photos/seed/kct17/600/760', 'Geometric fox tattoo',                          'Geometric Fox',      'geometric',   false, 2, 600, 760),
    ('https://picsum.photos/seed/kct18/600/700', 'Dotwork geometric pattern tattoo',              'Dotwork',            'geometric',   false, 3, 600, 700);
