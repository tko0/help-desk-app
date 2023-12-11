import React, { useState, useEffect } from 'react';
import axios from 'axios';
import TicketDetails from './TicketDetails';
import { Ticket } from './Ticket';

const AdminPanel: React.FC = () => {
  const [tickets, setTickets] = useState<Ticket[]>([]);
  const [selectedOption, setSelectedOption] = useState<string>('All Tickets');
  const [showDateFilter, setShowDateFilter] = useState<boolean>(false);
  const [startDate, setStartDate] = useState<string | null>(null);
  const [endDate, setEndDate] = useState<string | null>(null);
  const [appliedFilter, setAppliedFilter] = useState<string | null>(null);
  const [dateDropdown, setDateDropdown] = useState<'start' | 'end' | null>(null);
  const [filteredTickets, setFilteredTickets] = useState<Ticket[]>([]);
  const [searchText, setSearchText] = useState<string>('');
  const [selectedTicket, setSelectedTicket] = useState<Ticket | null>(null);
  const [isDateFilterActive, setIsDateFilterActive] = useState(false);

  useEffect(() => {
    axios.get<Ticket[]>(`${process.env.NEXT_PUBLIC_REACT_APP_API_URL}/tickets`)
    .then(response => {
        setTickets(response.data);
      })
      .catch(error => console.error('Error fetching tickets:', error));
  }, []);

  useEffect(() => {
    let filtered = tickets;

    if (selectedOption === 'Unassigned Tickets') {
      console.log('Not Implemented Yet!');
    } else if (selectedOption === 'My Open Tickets') {
      console.log('Not Implemented Yet!');
    } else if (selectedOption !== 'All Tickets') {
      filtered = tickets.filter((ticket) => ticket.status === selectedOption);
    }

    if (searchText.trim() !== '') {
      const searchLower = searchText.toLowerCase();
      filtered = filtered.filter((ticket) =>
        Object.values(ticket).some(
          (value) =>
            value &&
            typeof value === 'string' &&
            value.toLowerCase().includes(searchLower)
        )
      );
    }

    if (startDate && endDate) {
      filtered = filtered.filter((ticket) => {
        const ticketDate = new Date(ticket.updatedAt);
        const startRange = new Date(startDate);
        const endRange = new Date(endDate + 'T23:59:59');

        return ticketDate >= startRange && ticketDate <= endRange;
      });
    }

    setFilteredTickets(filtered);
  }, [selectedOption, searchText, tickets, startDate, endDate]);

  const handleStatusChange = (updatedTicket: Ticket) => {
    setTickets((prevTickets: Ticket[]) =>
      prevTickets.map((ticket) =>
        ticket.id === updatedTicket.id ? { ...ticket, status: updatedTicket.status } : ticket
      )
    );

    setFilteredTickets((prevFilteredTickets: Ticket[]) =>
      prevFilteredTickets.map((ticket) =>
        ticket.id === updatedTicket.id ? { ...ticket, status: updatedTicket.status } : ticket
      )
    );
  };


  useEffect(() => {
    console.log('AdminPanel has been updated with the new ticket state:', tickets);
  }, [tickets]);

  const handleDateFilterToggle = () => {
    setShowDateFilter(!showDateFilter);
  };

  const handleStartDateChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setStartDate(e.target.value);
  };

  const handleEndDateChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setEndDate(e.target.value);
  };

  const handleRemoveFilter = () => {
    setAppliedFilter(null);
  };

  const handleTicketClick = (ticket: Ticket) => {
    setSelectedTicket(ticket);
  };

  const handleTicketDetailsClose = () => {
    setSelectedTicket(null);
  };


  return (
    <div className="flex h-screen">
      <div className="w-1/4 bg-gray-800 text-white p-4">
        <div className="text-2xl font-bold mb-4 relative">
          Tickets
          <div className="absolute bottom-0 left-0 right-0 h-0.5 bg-gray-600"></div>
        </div>
        <input
          type="text"
          placeholder="Search in all tickets"
          value={searchText}
          onChange={(e) => setSearchText(e.target.value)}
          className="w-full p-2 mb-4 bg-gray-200 text-black rounded"
        />
        <div
          className="cursor-pointer p-6 rounded transition duration-300 hover:bg-gray-600 border-b border-gray-600"
          onClick={() => setSelectedOption('All Tickets')}
        >
          All Tickets
        </div>
        <div
          className="cursor-pointer p-6 rounded transition duration-300 hover:bg-gray-600"
          onClick={() => setSelectedOption('Unassigned Tickets')}
        >
          Unassigned Tickets
        </div>
        <div
          className="cursor-pointer p-6 rounded transition duration-300 hover:bg-gray-600 border-b border-gray-600"
          onClick={() => setSelectedOption('My Open Tickets')}
        >
          My Open Tickets
        </div>
        <div
          className="cursor-pointer p-6 rounded transition duration-300 hover:bg-gray-600"
          onClick={() => setSelectedOption('New')}
        >
          New
        </div>
        <div
          className="cursor-pointer p-6 rounded transition duration-300 hover:bg-gray-600"
          onClick={() => setSelectedOption('In Progress')}
        >
          In Progress
        </div>
        <div
          className="cursor-pointer p-6 rounded transition duration-300 hover:bg-gray-600 border-b border-gray-600"
          onClick={() => setSelectedOption('Resolved')}
        >
          Resolved
        </div>
        <div
          className="cursor-pointer p-6 rounded transition duration-300 hover:bg-gray-600"
          onClick={() => setSelectedOption('Spam')}
        >
          Spam
        </div>
      </div>
      <div className="flex-1 p-4 relative">
        <h2 className="text-white text-2xl font-bold mb-4 relative with-line">
          {selectedOption}
          <div className="absolute bottom-0 left-0 right-0 h-0.5 bg-gray-600"></div>
        </h2>
        <div className="mt-4">
          <button
            className="bg-gray-200 mb-2 p-2 rounded"
            onClick={handleDateFilterToggle}
          >
            Add Filter
          </button>
          {showDateFilter && (
            <div className="mt-2">
              <div className="flex">
                <div className="relative mr-2">
                  <label className="block mb-1 text-white">Start Date:</label>
                  <input
                    type="text"
                    value={startDate || ''}
                    readOnly
                    className="w-full p-2 bg-gray-200 text-black rounded cursor-pointer"
                    onClick={() => setDateDropdown('start')}
                  />
                  {dateDropdown === 'start' && (
                    <div className="absolute top-10 left-0 z-10 p-2 bg-white rounded border border-gray-300">
                      <input
                        type="date"
                        className="w-full p-2 bg-gray-200 text-black rounded"
                        onChange={handleStartDateChange}
                      />
                    </div>
                  )}
                </div>
                <div className="relative">
                  <label className="block mb-1 text-white">End Date:</label>
                  <input
                    type="text"
                    value={endDate || ''}
                    readOnly
                    className="w-full p-2 bg-gray-200 text-black rounded cursor-pointer"
                    onClick={() => setDateDropdown('end')}
                  />
                  {dateDropdown === 'end' && (
                    <div className="absolute top-10 left-0 z-10 p-2 bg-white rounded border border-gray-300">
                      <input
                        type="date"
                        className="w-full p-2 bg-gray-200 text-black rounded"
                        onChange={handleEndDateChange}
                      />
                    </div>
                  )}
                </div>
              </div>
            </div>
          )}
        </div>
        {appliedFilter && (
          <button
            className="mt-2 bg-gray-600 text-white py-2 px-4 rounded with-line"
            onClick={handleRemoveFilter}
          >
            {appliedFilter}
          </button>
        )}
        <div>
        <table className="w-full bg-gray-200 mt-4 mb-4 p-4 rounded">
            <thead>
              <tr>
                <th className="p-2 text-black">Subject</th>
                <th className="p-2 text-black">Email</th>
                <th className="p-2 text-black">Status</th>
                <th className="p-2 text-black">Last Message Time</th>
              </tr>
            </thead>
            <tbody>
            {filteredTickets.map(ticket => (
              <tr key={ticket.id} onClick={() => handleTicketClick(ticket)} className="cursor-pointer hover:bg-gray-300">
                <td className="p-2 text-black text-center">{ticket.subject}</td>
                <td className="p-2 text-black text-center">{ticket.email}</td>
                <td className="p-2 text-black text-center">{ticket.status}</td>
                <td className="p-2 text-black text-center">{new Date(ticket.updatedAt).toLocaleString()}</td>
              </tr>
            ))}
          </tbody>
          </table>
        </div>
        <TicketDetails ticket={selectedTicket} onClose={handleTicketDetailsClose} onStatusChange={handleStatusChange} />
      </div>
    </div>
  );
};

export default AdminPanel;
