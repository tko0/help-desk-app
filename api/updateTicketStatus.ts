import { VercelRequest, VercelResponse } from '@vercel/node';
import { sql } from '@vercel/postgres';

export default async function updateTicketStatus(req: VercelRequest, res: VercelResponse) {
  try {
    const { ticketId, newStatus } = req.body;

    if (!ticketId || !newStatus) {
      return res.status(400).json({ error: 'Ticket ID and new status are required' });
    }

    const result = await sql`
      UPDATE Tickets
      SET status = ${newStatus}
      WHERE id = ${ticketId};
    `;

    if (result.rowCount === 0) {
      return res.status(404).json({ error: 'Ticket not found' });
    }

    const updatedTicket = await sql`SELECT * FROM Tickets WHERE id = ${ticketId};`;

    res.json({ message: 'Ticket status updated successfully', ticket: updatedTicket[0] });
  } catch (error) {
    console.error('Error updating ticket status:', error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
}
