import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Ticket } from './Ticket';

interface TicketDetailsProps {
  ticket: Ticket | null;
  onClose: () => void;
  onStatusChange: (updatedTicket: Ticket) => void;
}

const TicketDetails: React.FC<TicketDetailsProps> = ({ ticket, onClose, onStatusChange }) => {
  const [replyText, setReplyText] = useState<string>('');
  const [newStatus, setNewStatus] = useState<string>(ticket?.status || '');

  useEffect(() => {
    setNewStatus(ticket?.status || '');
  }, [ticket]);

  const handleReplyChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    setReplyText(e.target.value);
  };

  const handleReplySend = () => {
    console.log('Would normally send an email here with body:', replyText);
    setReplyText('');
  };

  const handleApplyChanges = async () => {
    try {
      const ticketId = ticket?.id;
      if (ticketId !== undefined) {
        if (["New", "In Progress", "Resolved", "Spam"].includes(newStatus)) {
          await axios.put(`${process.env.NEXT_PUBLIC_REACT_APP_API_URL}/tickets/update-status`, {
            ticketId: ticketId,
            newStatus: newStatus,
          });

          onStatusChange({ ...ticket, status: newStatus } as Ticket);

          console.log('Ticket status updated successfully');
        } else {
          console.error('Invalid status:', newStatus);
        }
      }
    } catch (error) {
      console.error('Error updating ticket status:', error);
    }
  };


  useEffect(() => {
    setNewStatus(ticket?.status || '');
  }, [ticket]);

  if (!ticket) {
    return null;
  }

  return (
    <div className="fixed top-0 left-0 right-0 bottom-0 flex items-center justify-center bg-black bg-opacity-50">
      <div className="bg-white p-8 max-w-6xl max-h-4xl overflow-y-auto rounded-lg shadow-lg">
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-3xl font-bold">{ticket.subject}</h2>
          <button
            className="bg-gray-600 text-white py-2 px-4 rounded"
            onClick={onClose}
          >
            Close
          </button>
        </div>
        <div className="mb-4">
          <p className="mb-2">
            <span className="font-semibold">Name:</span> {ticket.name}
          </p>
          <p className="mb-2">
            <span className="font-semibold">Email:</span> {ticket.email}
          </p>
          <p className="mb-2">
            <span className="font-semibold">Problem Description:</span> {ticket.problemDescription}
          </p>
          <p className="mb-2">
            <span className="font-semibold">Status:</span> {ticket.status}
          </p>
          <p className="mb-2">
            <span className="font-semibold">Created:</span> {new Date(ticket.createdAt).toLocaleString()}
          </p>
          <p>
            <span className="font-semibold">Last Updated:</span> {new Date(ticket.updatedAt).toLocaleString()}
          </p>
          </div>
          <div className="mb-4">
          <label className="block mb-2 text-gray-800 font-semibold">Reply:</label>
          <textarea
            value={replyText}
            onChange={handleReplyChange}
            rows={4}
            className="w-full p-2 border border-gray-300 rounded"
          ></textarea>
          <button
            className="mt-2 bg-blue-500 text-white py-2 px-4 rounded"
            onClick={handleReplySend}
          >
            Send Reply
          </button>
        </div>
        <div className="mb-4">
          <label className="block mb-2 text-gray-800 font-semibold">Change Status:</label>
          <select
            value={newStatus}
            onChange={(e) => setNewStatus(e.target.value)}
            className="w-full p-2 border border-gray-300 rounded"
          >
            <option value="New">New</option>
            <option value="In Progress">In Progress</option>
            <option value="Resolved">Resolved</option>
            <option value="Spam">Spam</option>
          </select>
        </div>
        <button
          className="mt-2 bg-green-500 text-white py-2 px-4 rounded"
          onClick={handleApplyChanges}
        >
          Apply Changes
        </button>
      </div>
    </div>
  );
};

export default TicketDetails;