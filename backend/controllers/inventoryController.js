const pool = require('../config/db');

exports.getAllInventory = async (req, res) => {
    try {
        const [rows] = await pool.query('SELECT i.id, i.product_id, p.name, i.stock_quantity, i.last_updated FROM inventory i JOIN products p ON i.product_id = p.id');
        res.json(rows);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

exports.updateInventory = async (req, res) => {
    try {
        const { stock_quantity } = req.body;
        await pool.query('UPDATE inventory SET stock_quantity = ? WHERE id = ?', [stock_quantity, req.params.id]);
        res.json({ message: 'Inventory updated successfully' });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};
