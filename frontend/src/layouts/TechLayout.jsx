//frontend/src/layouts/TechLayout.jsx
import { Link, Outlet } from 'react-router-dom';

export default function TechLayout() {
  return (
    <div className="flex h-screen bg-gray-100">
      <aside className="w-64 bg-white shadow-md p-6 flex flex-col">
        <h2 className="text-xl font-bold mb-6">Technician Panel</h2>
        <nav className="flex flex-col gap-3">
          <Link to="/tech/dashboard" className="hover:text-blue-600">Dashboard</Link>
          <Link to="/tech/tickets" className="hover:text-blue-600">Assigned Tickets</Link>
          <Link to="/tech/notifications" className="hover:text-blue-600">Notifications</Link>
        </nav>
      </aside>
      <main className="flex-1 p-6 overflow-y-auto">
        <Outlet />
      </main>
    </div>
  )
}