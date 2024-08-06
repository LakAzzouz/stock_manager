CREATE TABLE stock_datas (
    id VARCHAR(36) PRIMARY KEY NOT NULL,
    product_id VARCHAR(36) NOT NULL,
    quantity INT NOT NULL,
    threshold INT NOT NULL,
    stock_id VARCHAR(36) NOT NULL
)