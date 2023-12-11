import { VercelRequest, VercelResponse } from '@vercel/node';
import { sql } from '@vercel/postgres';

export default async function getTickets(_req: VercelRequest, res: VercelResponse) {
  try {
    const tickets = await sql`SELECT * FROM Tickets;`;
    res.json(tickets);
  } catch (error) {
    console.error('Error fetching tickets:', error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
}
