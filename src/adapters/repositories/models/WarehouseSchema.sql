CREATE TABLE warehouses (
    `id` VARCHAR(36) PRIMARY KEY NOT NULL,
    city VARCHAR(20),
    manager_id VARCHAR(36) NOT NULL,
    number_of_employees INT,
    created_at TIMESTAMP,
    updated_at TIMESTAMP
)