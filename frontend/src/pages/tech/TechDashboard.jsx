//frontend/src/pages/tech/TechDashboard.jsx
import { useEffect, useState } from 'react';
import api from '../../api/axios';

export default function TechDashboard() {
  const [stats, setStats] = useState({
    assignedTickets: 0,
    completedTickets: 0
  });

  useEffect(() => {
    api.get('/tech/stats').then(res => setStats(res.data)).catch(() => {});
  }, []);

  return (
    <div>
      <h1 className="text-2xl font-bold mb-4">Technician Dashboard</h1>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div className="card p-4 bg-white shadow">
          <p className="text-sm text-gray-500">Assigned Tickets</p>
          <p className="text-xl font-bold">{stats.assignedTickets}</p>
        </div>
        <div className="card p-4 bg-white shadow">
          <p className="text-sm text-gray-500">Completed Tickets</p>
          <p className="text-xl font-bold">{stats.completedTickets}</p>
        </div>
      </div>
    </div>
  )
}