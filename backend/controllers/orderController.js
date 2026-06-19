const pool = require('../config/db');

exports.createOrder = async (req, res) => {
    const connection = await pool.getConnection();
    try {
        await connection.beginTransaction();
        const { user_id, items, total_amount } = req.body; 
        
        const [orderResult] = await connection.query(
            'INSERT INTO orders (user_id, total_amount, order_status) VALUES (?, ?, ?)',
            [user_id, total_amount, 'pending']
        );
        
        const orderId = orderResult.insertId;
        
        for (let item of items) {
            await connection.query(
                'INSERT INTO order_items (order_id, product_id, quantity, price) VALUES (?, ?, ?, ?)',
                [orderId, item.product_id, item.quantity, item.price]
            );
            
            // Decrement inventory
            await connection.query(
                'UPDATE inventory SET stock_quantity = stock_quantity - ? WHERE product_id = ? AND stock_quantity >= ?',
                [item.quantity, item.product_id, item.quantity]
            );
        }
        
        // Clear user cart
        await connection.query('DELETE FROM cart WHERE user_id = ?', [user_id]);
        
        await connection.commit();
        res.status(201).json({ message: 'Order created successfully', orderId });
    } catch (error) {
        await connection.rollback();
        res.status(500).json({ error: error.message });
    } finally {
        connection.release();
    }
};

exports.getAllOrders = async (req, res) => {
    try {
        const [rows] = await pool.query('SELECT * FROM orders ORDER BY created_at DESC');
        res.json(rows);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

exports.getOrderById = async (req, res) => {
    try {
        const [orders] = await pool.query('SELECT * FROM orders WHERE id = ?', [req.params.id]);
        if (orders.length === 0) return res.status(404).json({ message: 'Order not found' });
        
        const [items] = await pool.query(`
            SELECT oi.*, p.name 
            FROM order_items oi 
            JOIN products p ON oi.product_id = p.id 
            WHERE oi.order_id = ?
        `, [req.params.id]);
        
        const orderDetails = { ...orders[0], items };
        res.json(orderDetails);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};
