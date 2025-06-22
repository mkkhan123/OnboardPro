import React from 'react';

const candidates = [
  { id: 1, name: 'John Doe', status: 'Sourced' },
  { id: 2, name: 'Jane Smith', status: 'Interviewing' },
  { id: 3, name: 'Peter Jones', status: 'Offered' },
  { id: 4, name: 'Mary Williams', status: 'Hired' },
];

interface CandidateDetailsProps {
  onBack: () => void;
}

export default function CandidateDetails({ onBack }: CandidateDetailsProps) {
  return (
    <div className="w-full bg-indigo-50 p-4 rounded mt-4">
      <div className="flex justify-between items-center mb-4">
        <h3 className="text-xl font-bold text-indigo-800">Candidate Details</h3>
        <button onClick={onBack} className="px-4 py-2 bg-indigo-500 text-white rounded hover:bg-indigo-600">
          Back
        </button>
      </div>
      <table className="w-full text-left">
        <thead>
          <tr>
            <th className="p-2">Name</th>
            <th className="p-2">Status</th>
          </tr>
        </thead>
        <tbody>
          {candidates.map((c) => (
            <tr key={c.id} className="border-b">
              <td className="p-2">{c.name}</td>
              <td className="p-2">{c.status}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
} 