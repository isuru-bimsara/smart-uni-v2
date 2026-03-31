//frontend/src/layouts/AdminLayout.jsx
import { Link, Outlet } from "react-router-dom";

export default function AdminLayout() {
  return (
    <div className="flex h-screen bg-gray-100">
      <aside className="w-64 bg-white shadow-md p-6 flex flex-col">
        <h2 className="text-xl font-bold mb-6">Admin Panel</h2>
        <nav className="flex flex-col gap-3">
          <Link to="/admin/dashboard" className="hover:text-blue-600">
            Dashboard
          </Link>
          <Link to="/admin/bookings" className="hover:text-blue-600">
            Bookings
          </Link>
          <Link to="/admin/resources" className="hover:text-blue-600">
            Resources
          </Link>
          <Link to="/admin/tickets" className="hover:text-blue-600">
            Tickets
          </Link>
          <Link to="/admin/users" className="hover:text-blue-600">
            Users
          </Link>
          <Link to="/admin/notifications" className="hover:text-blue-600">
            Notifications
          </Link>
        </nav>
      </aside>
      <main className="flex-1 p-6 overflow-y-auto">
        <Outlet />
      </main>
    </div>
  );
}
