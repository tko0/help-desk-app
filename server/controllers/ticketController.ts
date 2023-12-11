import { Request, Response } from 'express';
import TicketModel from '../models/TicketModel';

export const submitTicket = async (req: Request, res: Response) => {
  try {
    const { name, email, subject, problemDescription } = req.body;

    if (!name || !email || !subject || !problemDescription) {
      return res.status(400).json({ error: 'Name, email, subject, and problemDescription are required' });
    }

    const ticket = await TicketModel.create({
      name,
      email,
      subject,
      problemDescription,
    });

    console.log('Ticket submitted successfully:', ticket);
    res.status(201).json(ticket);
  } catch (error) {
    console.error('Error submitting ticket:', error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
};


export const getTickets = async (_req: Request, res: Response) => {
  try {
    const tickets = await TicketModel.findAll({
      attributes: ['id', 'name', 'subject', 'email', 'problemDescription', 'status', 'createdAt', 'updatedAt'],
    });

    res.json(tickets);
  } catch (error) {
    console.error('Error fetching tickets:', error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
};

export const updateTicketStatus = async (req: Request, res: Response) => {
  try {
    const { ticketId, newStatus } = req.body;
    if (!ticketId || !newStatus) {
      return res.status(400).json({ error: 'Ticket ID and new status are required' });
    }

    const ticket = await TicketModel.findByPk(ticketId);
    if (!ticket) {
      return res.status(404).json({ error: 'Ticket not found' });
    }

    ticket.status = newStatus;
    await ticket.save();
    res.json({ message: 'Ticket status updated successfully', ticket });
  } catch (error) {
    console.error('Error updating ticket status:', error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
};