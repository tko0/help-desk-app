import { sql } from '@vercel/postgres';
import { NextResponse } from 'next/server';

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const name = searchParams.get('name');
  const email = searchParams.get('email');
  const subject = searchParams.get('subject');
  const problemDescription = searchParams.get('problemDescription');
  try {
    if (!name || !email || !subject || !problemDescription) throw new Error('Name, email, subject and description required');
    await sql`
      INSERT INTO tickets (name, email, subject, problemDescription, status)
      VALUES (${name}, ${email}, ${subject}, ${problemDescription}, 'New')
      RETURNING *;
    `;
  } catch (error) {
    return NextResponse.json({ error }, { status: 500 });
  }
  const tickets = await sql`SELECT * FROM tickets;`;
    return NextResponse.json({ tickets }, { status: 200 });
  }