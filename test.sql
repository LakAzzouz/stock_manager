DESC products

INSERT INTO products (id, price)
VALUES 
("1", 100),
("2", 200);

SELECT * FROM products;

DESC product_infos;

INSERT INTO product_infos (product_id, quantity)
VALUES
("1", 2),
("1", 3),
("2", 1),
("2", 10);

SELECT * FROM product_infos;

TRUNCATE TABLE product_infos;

SELECT SUM(products.price * product_infos.quantity) AS total_price
FROM product_infos 
JOIN products ON product_infos.product_id = products.id
WHERE product_infos.product_id IN("1", "2");

