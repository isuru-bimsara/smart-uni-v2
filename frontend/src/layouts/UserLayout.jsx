//frontend/src/layouts/UserLayout.jsx
import { Link, Outlet } from 'react-router-dom';

export default function UserLayout() {
  return (
    <div className="flex h-screen bg-gray-100">
      <aside className="w-64 bg-white shadow-md p-6 flex flex-col">
        <h2 className="text-xl font-bold mb-6">User Panel</h2>
        <nav className="flex flex-col gap-3">
          <Link to="/user/dashboard" className="hover:text-blue-600">Dashboard</Link>
          <Link to="/user/bookings" className="hover:text-blue-600">My Bookings</Link>
          <Link to="/user/resources" className="hover:text-blue-600">Resources</Link>
          <Link to="/user/tickets" className="hover:text-blue-600">My Tickets</Link>
          <Link to="/user/notifications" className="hover:text-blue-600">Notifications</Link>
        </nav>
      </aside>
      <main className="flex-1 p-6 overflow-y-auto">
        <Outlet />
      </main>
    </div>
  )
}