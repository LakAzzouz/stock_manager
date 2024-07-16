CREATE TABLE users (
    `id` VARCHAR(36) PRIMARY KEY NOT NULL,
    username VARCHAR(100) NOT NULL,
    email VARCHAR(100) NOT NULL,
    `password` VARCHAR(100) NOT NULL,
    birth_date TIMESTAMP,
    is_verified TINYINT(0),
    reset_password_code VARCHAR(16),
    verify_email_code VARCHAR(100),
    created_at TIMESTAMP,
    updated_at TIMESTAMP
)