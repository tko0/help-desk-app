const { sql } = require('@vercel/postgres');

module.exports = async function getTickets(_req, res) {
  try {
    const tickets = await sql`SELECT * FROM Tickets;`;
    res.json(tickets);
  } catch (error) {
    console.error('Error fetching tickets:', error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
};
