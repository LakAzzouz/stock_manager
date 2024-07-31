CREATE TABLE orders (
  `id` VARCHAR(36) NOT NULL,
  location_id VARCHAR(36) NOT NULL,
  total_price INT,
  order_date TIMESTAMP,
  `status` VARCHAR(20),
  expected_arrival_date TIMESTAMP,
  date_of_arrival TIMESTAMP,
  updated_at TIMESTAMP
)