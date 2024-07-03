USE stock_manager;

CREATE TABLE stocks (
    `id` VARCHAR(16) PRIMARY KEY NOT NULL,
    product_id VARCHAR(16) NOT NULL,
    created_at TIMESTAMP,
    updated_at TIMESTAMP
)