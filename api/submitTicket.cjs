const { sql } = require('@vercel/postgres');
const db = require('../db');

module.exports = async (req, res) => {
  const { name, email, subject, problemDescription } = req.body;

  try {
    const result = await pool.query(
      'INSERT INTO tickets (name, email, subject, problemDescription, status) VALUES ($1, $2, $3, $4, $5) RETURNING *',
      [name, email, subject, problemDescription, 'New']
    );

    const newTicket = result.rows[0];
    res.json(newTicket);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
};
