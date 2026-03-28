import { useEffect, useState } from 'react';
import { ticketsApi } from '../../api/tickets';

export default function TechTickets() {
  const [tickets, setTickets] = useState([]);
  useEffect(() => {
    ticketsApi.getAssigned().then(res => setTickets(res.data.data)).catch(() => {});
  }, []);

  return (
    <div>
      <h1 className="text-2xl font-bold mb-4">Assigned Tickets</h1>
      <table className="w-full border">
        <thead>
          <tr className="bg-gray-100">
            <th className="p-2">Title</th>
            <th className="p-2">User</th>
            <th className="p-2">Status</th>
          </tr>
        </thead>
        <tbody>
          {tickets.map(t => (
            <tr key={t.id} className="border-t">
              <td className="p-2">{t.title}</td>
              <td className="p-2">{t.userName}</td>
              <td className="p-2">{t.status}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  )
}