const pool = require('../config/db');

exports.getAllProducts = async (req, res) => {
    try {
        const [rows] = await pool.query('SELECT * FROM products');
        res.json(rows);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

exports.getProductById = async (req, res) => {
    try {
        const [rows] = await pool.query('SELECT * FROM products WHERE id = ?', [req.params.id]);
        if (rows.length === 0) return res.status(404).json({ message: 'Product not found' });
        res.json(rows[0]);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

exports.createProduct = async (req, res) => {
    try {
        const { name, description, category, price, image_url } = req.body;
        const [result] = await pool.query(
            'INSERT INTO products (name, description, category, price, image_url) VALUES (?, ?, ?, ?, ?)',
            [name, description, category, price, image_url]
        );
        res.status(201).json({ id: result.insertId, name, description, category, price, image_url });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

exports.updateProduct = async (req, res) => {
    try {
        const { name, description, category, price, image_url } = req.body;
        await pool.query(
            'UPDATE products SET name = ?, description = ?, category = ?, price = ?, image_url = ? WHERE id = ?',
            [name, description, category, price, image_url, req.params.id]
        );
        res.json({ message: 'Product updated successfully' });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

exports.deleteProduct = async (req, res) => {
    try {
        await pool.query('DELETE FROM products WHERE id = ?', [req.params.id]);
        res.json({ message: 'Product deleted successfully' });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};
