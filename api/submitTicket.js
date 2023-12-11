const { sql } = require('@vercel/postgres');

module.exports = async function submitTicket(req, res) {
  try {
    const { name, email, subject, problemDescription } = req.body;

    if (!name || !email || !subject || !problemDescription) {
      return res.status(400).json({ error: 'Name, email, subject, and problemDescription are required' });
    }

    await sql`
      INSERT INTO Tickets (name, email, subject, problemDescription, status)
      VALUES (${name}, ${email}, ${subject}, ${problemDescription}, 'New');
    `;

    const tickets = await sql`SELECT * FROM Tickets;`;

    return res.status(201).json(tickets);
  } catch (error) {
    console.error('Error submitting ticket:', error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
};
