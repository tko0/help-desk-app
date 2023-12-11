import express from 'express';
import { submitTicket, getTickets, updateTicketStatus } from '../controllers/ticketController';

const router = express.Router();

router.post('/submit', submitTicket);
router.get('/', getTickets);
router.put('/update-status', updateTicketStatus);

export default router;