import React from 'react';

const clients = [
  { id: 1, name: 'Tech Solutions Inc.', industry: 'Technology' },
  { id: 2, name: 'Innovate LLC', industry: 'Consulting' },
  { id: 3, name: 'HealthFirst Corp.', industry: 'Healthcare' },
];

interface ClientDetailsProps {
  onBack: () => void;
}

export default function ClientDetails({ onBack }: ClientDetailsProps) {
  return (
    <div className="w-full bg-blue-50 p-4 rounded mt-4">
      <div className="flex justify-between items-center mb-4">
        <h3 className="text-xl font-bold text-blue-800">Client Details</h3>
        <button onClick={onBack} className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600">
          Back
        </button>
      </div>
      <table className="w-full text-left">
        <thead>
          <tr>
            <th className="p-2">Name</th>
            <th className="p-2">Industry</th>
          </tr>
        </thead>
        <tbody>
          {clients.map((c) => (
            <tr key={c.id} className="border-b">
              <td className="p-2">{c.name}</td>
              <td className="p-2">{c.industry}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
} 