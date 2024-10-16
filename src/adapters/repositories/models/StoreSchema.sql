CREATE TABLE stores (
    `id` VARCHAR(36) PRIMARY KEY NOT NULL,
    `name` VARCHAR(20),
    city VARCHAR(20),
    turnover INT,
    frequentation INT,
    price_reduction INT,
    created_at TIMESTAMP,
    updated_at TIMESTAMP 
)