import { useState, useEffect } from 'react';
import { bookingsApi } from '../../api/bookings';

export default function UserBookings() {
  const [bookings, setBookings] = useState([]);
  useEffect(() => {
    bookingsApi.getMyBookings().then(res => setBookings(res.data.data)).catch(() => {});
  }, []);

  return (
    <div>
      <h1 className="text-2xl font-bold mb-4">My Bookings</h1>
      <table className="w-full border">
        <thead>
          <tr className="bg-gray-100">
            <th className="p-2">Resource</th>
            <th className="p-2">Date</th>
            <th className="p-2">Status</th>
          </tr>
        </thead>
        <tbody>
          {bookings.map(b => (
            <tr key={b.id} className="border-t">
              <td className="p-2">{b.resourceName}</td>
              <td className="p-2">{new Date(b.startTime).toLocaleString()}</td>
              <td className="p-2">{b.status}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  )
}