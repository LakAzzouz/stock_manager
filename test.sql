INSERT INTO StockDatas (id, product_id, quantity, threshold, stock_id)
        VALUES ("id", "product_id", "quantity", "threshold", "stock_id")
        ON CONFLICT (id) DO UPDATE
        SET product_id = EXCLUDED.product_id,
        quantity = EXCLUDED.quantity,
        threshold = EXCLUDED.threshold,
        stock_id = EXCLUDED.stock_id`