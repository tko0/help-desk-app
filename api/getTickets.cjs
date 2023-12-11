const { sql } = require('@vercel/postgres');
const db = require('../db');

module.exports = async (req, res) => {
  try {
    const result = await pool.query('SELECT * FROM tickets');
    const tickets = result.rows;

    res.json(tickets);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
};
