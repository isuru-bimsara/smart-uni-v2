import { useState, useEffect } from 'react'
import api from '../api/axios'
import { bookingsApi } from '../api/bookings'
import { ticketsApi } from '../api/tickets'

const ROLES = ['USER', 'ADMIN', 'TECHNICIAN']

export default function AdminPage() {
  const [users, setUsers] = useState([])
  const [stats, setStats] = useState({ totalBookings: 0, pendingBookings: 0, openTickets: 0, totalUsers: 0 })
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    Promise.all([
      api.get('/admin/users'),
      bookingsApi.getAll(),
      ticketsApi.getAll(),
    ]).then(([usersRes, bookingsRes, ticketsRes]) => {
      const userList = usersRes.data.data || []
      const bookings = bookingsRes.data.data || []
      const tickets = ticketsRes.data.data || []
      setUsers(userList)
      setStats({
        totalUsers: userList.length,
        totalBookings: bookings.length,
        pendingBookings: bookings.filter(b => b.status === 'PENDING').length,
        openTickets: tickets.filter(t => t.status === 'OPEN').length,
      })
    }).catch(() => {}).finally(() => setLoading(false))
  }, [])

  const handleRoleChange = async (userId, role) => {
    try {
      await api.patch(`/admin/users/${userId}/role`, { role })
      setUsers(prev => prev.map(u => u.id === userId ? { ...u, role } : u))
    } catch (err) {
      alert('Failed to update role')
    }
  }

  return (
    <div>
      <div className="mb-6">
        <h1 className="text-2xl font-bold text-gray-900">Admin Dashboard</h1>
        <p className="text-gray-500 text-sm mt-1">System overview and user management</p>
      </div>

      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
        {[
          { label: 'Total Users', value: stats.totalUsers, icon: '👥', color: 'text-blue-600' },
          { label: 'Total Bookings', value: stats.totalBookings, icon: '📅', color: 'text-green-600' },
          { label: 'Pending Bookings', value: stats.pendingBookings, icon: '⏳', color: 'text-yellow-600' },
          { label: 'Open Tickets', value: stats.openTickets, icon: '🔧', color: 'text-red-600' },
        ].map(s => (
          <div key={s.label} className="card">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-xs text-gray-500">{s.label}</p>
                <p className={`text-2xl font-bold mt-1 ${s.color}`}>{s.value}</p>
              </div>
              <span className="text-3xl">{s.icon}</span>
            </div>
          </div>
        ))}
      </div>

      <div className="card">
        <h2 className="text-lg font-semibold text-gray-900 mb-4">User Management</h2>
        {loading ? (
          <div className="flex justify-center py-8"><div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600"></div></div>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="text-left border-b border-gray-100">
                  <th className="pb-3 text-sm font-medium text-gray-500">User</th>
                  <th className="pb-3 text-sm font-medium text-gray-500">Email</th>
                  <th className="pb-3 text-sm font-medium text-gray-500">Role</th>
                  <th className="pb-3 text-sm font-medium text-gray-500">Joined</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-50">
                {users.map(u => (
                  <tr key={u.id}>
                    <td className="py-3">
                      <div className="flex items-center gap-2">
                        {u.picture ? (
                          <img src={u.picture} alt={u.name} className="w-7 h-7 rounded-full" />
                        ) : (
                          <div className="w-7 h-7 rounded-full bg-blue-100 flex items-center justify-center text-blue-600 text-xs font-bold">
                            {u.name?.[0]?.toUpperCase()}
                          </div>
                        )}
                        <span className="text-sm font-medium text-gray-900">{u.name}</span>
                      </div>
                    </td>
                    <td className="py-3 text-sm text-gray-600">{u.email}</td>
                    <td className="py-3">
                      <select
                        value={u.role}
                        onChange={e => handleRoleChange(u.id, e.target.value)}
                        className="text-sm border border-gray-200 rounded px-2 py-1"
                      >
                        {ROLES.map(r => <option key={r}>{r}</option>)}
                      </select>
                    </td>
                    <td className="py-3 text-sm text-gray-500">
                      {u.createdAt ? new Date(u.createdAt).toLocaleDateString() : '-'}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </div>
  )
}
