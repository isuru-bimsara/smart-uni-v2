import { useState, useEffect } from 'react'
import { useAuth } from '../context/AuthContext'
import { resourcesApi } from '../api/resources'
import { bookingsApi } from '../api/bookings'
import { ticketsApi } from '../api/tickets'
import { Link } from 'react-router-dom'

function StatCard({ title, value, icon, color, to }) {
  return (
    <Link to={to} className="card hover:shadow-md transition-shadow">
      <div className="flex items-center justify-between">
        <div>
          <p className="text-sm text-gray-500">{title}</p>
          <p className={`text-3xl font-bold mt-1 ${color}`}>{value}</p>
        </div>
        <div className="text-4xl">{icon}</div>
      </div>
    </Link>
  )
}

export default function DashboardPage() {
  const { user } = useAuth()
  const [stats, setStats] = useState({ resources: 0, bookings: 0, tickets: 0, pending: 0 })
  const [recentBookings, setRecentBookings] = useState([])
  const [recentTickets, setRecentTickets] = useState([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    Promise.all([
      resourcesApi.getAll(),
      bookingsApi.getMyBookings(),
      ticketsApi.getMyTickets(),
    ]).then(([res, book, tick]) => {
      const bookings = book.data.data || []
      const tickets = tick.data.data || []
      setStats({
        resources: res.data.data?.length || 0,
        bookings: bookings.length,
        tickets: tickets.length,
        pending: bookings.filter(b => b.status === 'PENDING').length,
      })
      setRecentBookings(bookings.slice(0, 3))
      setRecentTickets(tickets.slice(0, 3))
    }).catch(() => {}).finally(() => setLoading(false))
  }, [])

  const getStatusBadge = (status) => {
    const map = {
      PENDING: 'badge-pending',
      APPROVED: 'badge-approved',
      REJECTED: 'badge-rejected',
      CANCELLED: 'badge-cancelled',
      OPEN: 'badge-open',
      IN_PROGRESS: 'badge-in-progress',
      RESOLVED: 'badge-resolved',
      CLOSED: 'badge-closed',
    }
    return <span className={map[status] || 'badge-pending'}>{status}</span>
  }

  if (loading) return (
    <div className="flex items-center justify-center h-64">
      <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600"></div>
    </div>
  )

  return (
    <div>
      <div className="mb-8">
        <h1 className="text-2xl font-bold text-gray-900">
          Welcome back, {user?.name?.split(' ')[0]}! 👋
        </h1>
        <p className="text-gray-500 mt-1">Here's what's happening on campus today.</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        <StatCard title="Available Resources" value={stats.resources} icon="🏛️" color="text-blue-600" to="/resources" />
        <StatCard title="My Bookings" value={stats.bookings} icon="📅" color="text-green-600" to="/bookings" />
        <StatCard title="Pending Approvals" value={stats.pending} icon="⏳" color="text-yellow-600" to="/bookings" />
        <StatCard title="My Tickets" value={stats.tickets} icon="🔧" color="text-purple-600" to="/tickets" />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div className="card">
          <div className="flex justify-between items-center mb-4">
            <h2 className="text-lg font-semibold text-gray-900">Recent Bookings</h2>
            <Link to="/bookings" className="text-sm text-blue-600 hover:text-blue-700">View all</Link>
          </div>
          {recentBookings.length === 0 ? (
            <p className="text-gray-500 text-sm text-center py-4">No bookings yet</p>
          ) : (
            <div className="space-y-3">
              {recentBookings.map(b => (
                <div key={b.id} className="flex items-center justify-between py-2 border-b last:border-0">
                  <div>
                    <p className="text-sm font-medium text-gray-900">{b.resourceName}</p>
                    <p className="text-xs text-gray-500">
                      {new Date(b.startTime).toLocaleDateString()}
                    </p>
                  </div>
                  {getStatusBadge(b.status)}
                </div>
              ))}
            </div>
          )}
        </div>

        <div className="card">
          <div className="flex justify-between items-center mb-4">
            <h2 className="text-lg font-semibold text-gray-900">Recent Tickets</h2>
            <Link to="/tickets" className="text-sm text-blue-600 hover:text-blue-700">View all</Link>
          </div>
          {recentTickets.length === 0 ? (
            <p className="text-gray-500 text-sm text-center py-4">No tickets yet</p>
          ) : (
            <div className="space-y-3">
              {recentTickets.map(t => (
                <div key={t.id} className="flex items-center justify-between py-2 border-b last:border-0">
                  <div>
                    <p className="text-sm font-medium text-gray-900">{t.title}</p>
                    <p className="text-xs text-gray-500">{t.category}</p>
                  </div>
                  {getStatusBadge(t.status)}
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  )
}
