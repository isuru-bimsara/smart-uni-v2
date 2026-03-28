// //frontend/src/pages/admin/AdminBookings.jsx
// import { useState, useEffect } from 'react';
// import { bookingsApi } from '../../api/bookings';

// export default function AdminBookings() {
//   const [bookings, setBookings] = useState([]);
//   useEffect(() => {
//     bookingsApi.getAll().then(res => setBookings(res.data.data)).catch(() => {});
//   }, []);

//   return (
//     <div>
//       <h1 className="text-2xl font-bold mb-4">Bookings</h1>
//       <table className="w-full border">
//         <thead>
//           <tr className="bg-gray-100">
//             <th className="p-2">Resource</th>
//             <th className="p-2">User</th>
//             <th className="p-2">Date</th>
//             <th className="p-2">Status</th>
//           </tr>
//         </thead>
//         <tbody>
//           {bookings.map(b => (
//             <tr key={b.id} className="border-t">
//               <td className="p-2">{b.resourceName}</td>
//               <td className="p-2">{b.userName}</td>
//               <td className="p-2">{new Date(b.startTime).toLocaleString()}</td>
//               <td className="p-2">{b.status}</td>
//             </tr>
//           ))}
//         </tbody>
//       </table>
//     </div>
//   )
// }

import { useState, useEffect } from 'react';
import { bookingsApi } from '../../api/bookings';
import { formatDistanceToNowStrict } from 'date-fns';

export default function AdminBookings() {
  const [bookings, setBookings] = useState([]);
  const [loading, setLoading] = useState(true);

  // Fetch all bookings
  const fetchBookings = async () => {
    try {
      const res = await bookingsApi.getAll();
      const updatedBookings = res.data.data.map((b) => {
        // Auto-cancel if endTime passed
        const now = new Date();
        if (new Date(b.endTime) < now && b.status === 'PENDING') {
          b.status = 'CANCELLED';
          b.autoCancelled = true;
        }
        return b;
      });
      setBookings(updatedBookings);
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchBookings();
    const interval = setInterval(fetchBookings, 60 * 1000); // refresh every 1 min
    return () => clearInterval(interval);
  }, []);

  // Admin actions
  const handleStatusChange = async (id, action) => {
    try {
      let res;
      switch (action) {
        case 'approve':
          res = await bookingsApi.approve(id);
          break;
        case 'reject':
          res = await bookingsApi.reject(id);
          break;
        case 'cancel':
          res = await bookingsApi.cancel(id);
          break;
        default:
          return;
      }
      setBookings((prev) =>
        prev.map((b) => (b.id === id ? res.data.data : b))
      );
    } catch (err) {
      console.error(err);
      alert('Failed to update status');
    }
  };

  const renderCancelledTime = (booking) => {
    if (booking.status !== 'CANCELLED') return '-';
    const endTime = new Date(booking.endTime);
    const cancelTime = booking.updatedAt ? new Date(booking.updatedAt) : new Date();
    const diff = endTime - cancelTime;
    return diff > 0
      ? formatDistanceToNowStrict(cancelTime, { addSuffix: true })
      : 'After end time';
  };

  if (loading) return <p>Loading bookings...</p>;

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-4">All Bookings</h1>
      <div className="overflow-x-auto">
        <table className="w-full border border-gray-200 rounded-lg">
          <thead className="bg-gray-100 text-left">
            <tr>
              <th className="p-2 border-b">Resource</th>
              <th className="p-2 border-b">User</th>
              <th className="p-2 border-b">Start Time</th>
              <th className="p-2 border-b">End Time</th>
              <th className="p-2 border-b">Status</th>
              <th className="p-2 border-b">Cancelled Time</th>
              <th className="p-2 border-b">Actions</th>
            </tr>
          </thead>
          <tbody>
            {bookings.map((b) => (
              <tr key={b.id} className="border-b hover:bg-gray-50">
                <td className="p-2">{b.resourceName}</td>
                <td className="p-2">{b.userName}</td>
                <td className="p-2">{new Date(b.startTime).toLocaleString()}</td>
                <td className="p-2">{new Date(b.endTime).toLocaleString()}</td>
                <td className={`p-2 font-semibold ${b.status === 'APPROVED' ? 'text-green-600' : b.status === 'REJECTED' ? 'text-red-600' : b.status === 'CANCELLED' ? 'text-orange-600' : 'text-gray-600'}`}>
                  {b.status}{b.autoCancelled ? ' (auto)' : ''}
                </td>
                <td className="p-2">{renderCancelledTime(b)}</td>
                <td className="p-2 space-x-2">
                  {b.status === 'PENDING' && (
                    <>
                      <button
                        onClick={() => handleStatusChange(b.id, 'approve')}
                        className="px-2 py-1 bg-green-500 text-white rounded hover:bg-green-600"
                      >
                        Approve
                      </button>
                      <button
                        onClick={() => handleStatusChange(b.id, 'reject')}
                        className="px-2 py-1 bg-red-500 text-white rounded hover:bg-red-600"
                      >
                        Reject
                      </button>
                      <button
                        onClick={() => handleStatusChange(b.id, 'cancel')}
                        className="px-2 py-1 bg-orange-500 text-white rounded hover:bg-orange-600"
                      >
                        Cancel
                      </button>
                    </>
                  )}
                  {b.status === 'APPROVED' && (
                    <button
                      onClick={() => handleStatusChange(b.id, 'cancel')}
                      className="px-2 py-1 bg-orange-500 text-white rounded hover:bg-orange-600"
                    >
                      Cancel
                    </button>
                  )}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}