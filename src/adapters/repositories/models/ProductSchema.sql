USE stock_manager;

CREATE TABLE products (
    `id` VARCHAR(36) PRIMARY KEY NOT NULL,
    `name` VARCHAR(20),
    product_type VARCHAR(20),
    `image` VARCHAR(255),
    price INT,
    `size` INT,
    created_at TIMESTAMP,
    updated_at TIMESTAMP
)