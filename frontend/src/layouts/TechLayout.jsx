// //frontend/src/layouts/TechLayout.jsx
// import { Link, Outlet } from 'react-router-dom';

// export default function TechLayout() {
//   return (
//     <div className="flex h-screen bg-gray-100">
//       <aside className="w-64 bg-white shadow-md p-6 flex flex-col">
//         <h2 className="text-xl font-bold mb-6">Technician Panel</h2>
//         <nav className="flex flex-col gap-3">
//           <Link to="/tech/dashboard" className="hover:text-blue-600">Dashboard</Link>
//           <Link to="/tech/tickets" className="hover:text-blue-600">Assigned Tickets</Link>
//           <Link to="/tech/notifications" className="hover:text-blue-600">Notifications</Link>
//         </nav>
//       </aside>
//       <main className="flex-1 p-6 overflow-y-auto">
//         <Outlet />
//       </main>
//     </div>
//   )
// }

// frontend/src/layouts/TechLayout.jsx
import { Link, Outlet, useLocation } from 'react-router-dom';

export default function TechLayout() {
  const location = useLocation();

  const navLinkClass = (path) => 
    `px-4 py-2 rounded-lg transition-colors ${
      location.pathname === path 
        ? "bg-blue-50 text-blue-600 font-semibold" 
        : "text-gray-600 hover:bg-gray-50 hover:text-blue-600"
    }`;

  return (
    <div className="flex h-screen bg-gray-100 font-sans">
      {/* Sidebar */}
      <aside className="w-64 bg-white shadow-lg p-6 flex flex-col border-r border-gray-200">
        <h2 className="text-xl font-bold mb-8 text-gray-800">Technician Panel</h2>
        
        <nav className="flex flex-col gap-2">
          <Link to="/tech/dashboard" className={navLinkClass('/tech/dashboard')}>
            Dashboard
          </Link>
          <Link to="/tech/tickets" className={navLinkClass('/tech/tickets')}>
            Assigned Tickets
          </Link>
          <Link to="/tech/notifications" className={navLinkClass('/tech/notifications')}>
            Notifications
          </Link>
        </nav>

        <div className="mt-auto pt-6 border-t border-gray-100">
          <button className="text-sm text-red-500 hover:text-red-700 px-4">Logout</button>
        </div>
      </aside>

      {/* Main Content Area */}
      <main className="flex-1 p-8 overflow-y-auto">
        <Outlet />
      </main>
    </div>
  );
}