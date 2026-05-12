CREATE TABLE booking_inquiries (
    id           BIGSERIAL    PRIMARY KEY,
    name         VARCHAR(255) NOT NULL,
    email        VARCHAR(255) NOT NULL,
    phone        VARCHAR(50),
    idea         TEXT         NOT NULL,
    style        VARCHAR(100) NOT NULL,
    placement    VARCHAR(255) NOT NULL,
    size         VARCHAR(100) NOT NULL,
    referral     VARCHAR(100),
    submitted_at TIMESTAMPTZ  NOT NULL DEFAULT NOW()
);
