USE fashion_retail;

-- Clear existing data if re-running
SET FOREIGN_KEY_CHECKS = 0;
TRUNCATE TABLE order_items;
TRUNCATE TABLE orders;
TRUNCATE TABLE cart;
TRUNCATE TABLE inventory;
TRUNCATE TABLE products;
TRUNCATE TABLE users;
SET FOREIGN_KEY_CHECKS = 1;

INSERT INTO users (name, email, password, role) VALUES
('Admin User', 'admin@lumiere.com', 'hashed_pwd_admin', 'admin'),
('John Doe', 'john@example.com', 'hashed_pwd_123', 'customer'),
('Jane Smith', 'jane@example.com', 'hashed_pwd_456', 'customer');

INSERT INTO products (name, description, category, price, image_url) VALUES
('Classic White Tee', 'Premium cotton classic fit white t-shirt.', 'Tops', 29.99, 'https://images.unsplash.com/photo-1521572163474-6864f9cf17ab?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80'),
('Denim Jacket', 'Vintage wash denim jacket with silver buttons.', 'Outerwear', 89.99, 'https://images.unsplash.com/photo-1576871337622-98d48d1cf531?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80'),
('Slim Fit Jeans', 'Dark wash slim fit stretch denim.', 'Bottoms', 59.99, 'https://images.unsplash.com/photo-1542272604-787c3835535d?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80'),
('Leather Boots', 'Handcrafted genuine leather ankle boots.', 'Footwear', 149.99, 'https://images.unsplash.com/photo-1520639888713-7851133b1ed0?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80');

INSERT INTO inventory (product_id, stock_quantity) VALUES
(1, 150),
(2, 45),
(3, 80),
(4, 25);

INSERT INTO cart (user_id, product_id, quantity) VALUES
(2, 1, 2),
(2, 3, 1),
(3, 2, 1);

INSERT INTO orders (user_id, total_amount, order_status) VALUES
(2, 119.97, 'delivered'),
(3, 89.99, 'processing');

INSERT INTO order_items (order_id, product_id, quantity, price) VALUES
(1, 1, 2, 29.99),
(1, 3, 1, 59.99),
(2, 2, 1, 89.99);
