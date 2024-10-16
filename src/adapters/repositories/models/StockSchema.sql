CREATE TABLE stocks (
    `id` VARCHAR(36) PRIMARY KEY NOT NULL,
    location_id VARCHAR(36) NOT NULL,
    `type` VARCHAR(16),
    created_at TIMESTAMP,
    updated_at TIMESTAMP
)