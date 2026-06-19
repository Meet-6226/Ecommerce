const pool = require('../config/db');

exports.getCartByUserId = async (req, res) => {
    try {
        const [rows] = await pool.query(`
            SELECT c.id as cart_id, c.product_id, p.name, p.price, p.image_url, c.quantity 
            FROM cart c 
            JOIN products p ON c.product_id = p.id 
            WHERE c.user_id = ?
        `, [req.params.userId]);
        res.json(rows);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

exports.addToCart = async (req, res) => {
    try {
        const { user_id, product_id, quantity } = req.body;
        
        const [existing] = await pool.query('SELECT id, quantity FROM cart WHERE user_id = ? AND product_id = ?', [user_id, product_id]);
        
        if (existing.length > 0) {
            await pool.query('UPDATE cart SET quantity = quantity + ? WHERE id = ?', [quantity, existing[0].id]);
        } else {
            await pool.query('INSERT INTO cart (user_id, product_id, quantity) VALUES (?, ?, ?)', [user_id, product_id, quantity]);
        }
        res.status(201).json({ message: 'Item added to cart successfully' });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

exports.removeFromCart = async (req, res) => {
    try {
        await pool.query('DELETE FROM cart WHERE id = ?', [req.params.id]);
        res.json({ message: 'Item removed from cart' });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

exports.updateCartItem = async (req, res) => {
    try {
        const { quantity } = req.body;
        await pool.query('UPDATE cart SET quantity = ? WHERE id = ?', [quantity, req.params.id]);
        res.json({ message: 'Cart updated successfully' });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};
