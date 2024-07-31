CREATE TABLE medias (
  `id` VARCHAR(36) NOT NULL,
  entity_id VARCHAR(36) NOT NULL,
  `url` VARCHAR(100) NOT NULL,
  entity_type VARCHAR(20),
  mime_type VARCHAR(10),
  created_at TIMESTAMP,
  updated_at TIMESTAMP
)