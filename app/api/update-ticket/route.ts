import { sql } from '@vercel/postgres';
import { NextResponse } from 'next/server';

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const ticketId = searchParams.get('ticketId');
  const updatedStatus = searchParams.get('updatedStatus');

  try {
    if (!ticketId || !updatedStatus) throw new Error('Ticket ID and updated status required');

    await sql`UPDATE Tickets SET Status = ${updatedStatus} WHERE ID = ${ticketId};`;
  } catch (error) {
    return NextResponse.json({ error }, { status: 500 });
  }

  try {
    const updatedTicket = await sql`SELECT * FROM Tickets WHERE ID = ${ticketId};`;
    return NextResponse.json({ updatedTicket }, { status: 200 });
  } catch (error) {
    return NextResponse.json({ error }, { status: 500 });
  }
}
