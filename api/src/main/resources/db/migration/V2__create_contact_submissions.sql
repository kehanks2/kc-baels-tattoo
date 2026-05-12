CREATE TABLE contact_submissions (
    id           BIGSERIAL    PRIMARY KEY,
    name         VARCHAR(255) NOT NULL,
    email        VARCHAR(255) NOT NULL,
    topic        VARCHAR(100) NOT NULL,
    message      TEXT         NOT NULL,
    submitted_at TIMESTAMPTZ  NOT NULL DEFAULT NOW()
);
