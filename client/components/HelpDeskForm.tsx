import React, { useState } from 'react';

const HelpDeskForm: React.FC = () => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [subject, setSubject] = useState('');
  const [problemDescription, setProblemDescription] = useState('');
  const [submitting, setSubmitting] = useState(false);

  const handleSubmit = async () => {
    try {
      setSubmitting(true);

      if (!name || !email || !subject || !problemDescription) {
        console.error('Please fill in all required fields');
        return;
      }
      console.log('Submitting Ticket:', { name, email, subject, problemDescription });

      const response = await fetch(`${process.env.NEXT_PUBLIC_REACT_APP_API_URL}/tickets/submit`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ name, email, subject, problemDescription }),
      });

      if (response.ok) {
        console.log('Ticket submitted successfully');
      } else {
        console.error('Failed to submit ticket');
      }
    } catch (error) {
      console.error('Error submitting ticket:', error);
    } finally {
      setSubmitting(false);
    }
  };


  const isButtonDisabled = !name || !email || !subject || !problemDescription || submitting;

  return (
    <div className="bg-neutral-900 flex items-center justify-center h-screen">
      <div className="max-w-4xl mx-auto p-6 bg-gray-800 text-white rounded-md shadow-md w-full">
        <h1 className="text-3xl font-semibold mb-6">Contact Us!</h1>
        <div className="mb-4">
          <label htmlFor="name" className="block text-sm font-medium">
            Name:
          </label>
          <input
            type="text"
            id="name"
            value={name}
            onChange={(e) => setName(e.target.value)}
            className="mt-1 p-3 w-full border rounded-md bg-white text-black"
            disabled={submitting}
          />
        </div>
        <div className="mb-4">
          <label htmlFor="email" className="block text-sm font-medium">
            Email:
          </label>
          <input
            type="email"
            id="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="mt-1 p-3 w-full border rounded-md bg-white text-black"
            disabled={submitting}
          />
        </div>
        <div className="mb-4">
          <label htmlFor="subject" className="block text-sm font-medium">
            Subject:
          </label>
          <input
            type="text"
            id="subject"
            value={subject}
            onChange={(e) => setSubject(e.target.value)}
            className="mt-1 p-3 w-full border rounded-md bg-white text-black"
            disabled={submitting}
          />
        </div>
        <div className="mb-4">
          <label htmlFor="problemDescription" className="block text-sm font-medium">
            Problem Description:
          </label>
          <textarea
            id="problemDescription"
            value={problemDescription}
            onChange={(e) => setProblemDescription(e.target.value)}
            className="mt-1 p-3 w-full border rounded-md bg-white text-black"
            disabled={submitting}
          />
        </div>
        <button
          onClick={handleSubmit}
          disabled={isButtonDisabled}
          className={`bg-gray-600 text-white p-3 rounded-md ${isButtonDisabled && 'opacity-50 cursor-not-allowed'}`}
        >
          {submitting ? 'Submitting...' : 'Submit Ticket'}
        </button>
      </div>
    </div>
  );
};

export default HelpDeskForm;
