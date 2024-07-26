SELECT SUM(products.price * product_infos.quantity) AS total_price
FROM product_infos 
JOIN products ON product_infos.product_id = products.id
WHERE product_infos.product_id IN ("id", "id2")

SELECT SUM(products.price * product_infos.quantity) AS total_price 
FROM products
JOIN product_infos ON products.id = product_infos.product_id
WHERE products.id IN ("id", "id2")

SELECT * FROM products WHERE id = "id2"

SELECT * FROM product_infos WHERE product_id = "id2"



SELECT
      orders.id AS id,
      JSON_ARRAYAGG(
        JSON_OBJECT(
          'quantity', product_infos.quantity,
          'product_id', product_infos.product_id
        )
      ) AS product_infos,
      MAX(orders.location_id) AS location_id,
      MAX(orders.total_price) AS total_price,
      MAX(orders.order_date) AS order_date,
      MAX(orders.status) AS status,
      MAX(orders.expected_arrival_date) AS expected_arrival_date,
      MAX(orders.date_of_arrival) AS date_of_arrival,
      MAX(orders.updated_at) AS updated_at
      FROM orders
      LEFT JOIN product_infos ON orders.id = product_infos.order_id
      WHERE orders.id = "b3b37044-3158-4823-bc75-6b23038f5be1"
      GROUP BY orders.id