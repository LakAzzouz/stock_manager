INSERT INTO stocks (id, location_id, type)
VALUES ("id", "location_id", "type")

INSERT INTO stock_datas (product_id, quantity, threshold, stock_id)
VALUES ("product_id", 10, 1, "id")

SELECT 
stocks.id AS id,
JSON_ARRAYAGG(
JSON_OBJECT(
'quantity', sd.quantity,
'product_id', sd.product_id,
'threshold', sd.threshold,
'stock_id', sd.stock_id
)
) AS stock_datas,
MAX(stocks.location_id) AS location_id,
MAX(stocks.type) AS type,
MAX(stocks.created_at) AS created_at,
MAX(stocks.updated_at) AS updated_at
FROM stock_datas AS sd
LEFT JOIN stocks ON stocks.id = sd.stock_id
WHERE stocks.id = "id"
GROUP BY stocks.id;