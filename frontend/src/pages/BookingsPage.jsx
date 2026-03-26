import { useState, useEffect } from 'react'
import { bookingsApi } from '../api/bookings'
import { useAuth } from '../context/AuthContext'

const statusBadge = (status) => {
  const map = {
    PENDING: 'badge-pending',
    APPROVED: 'badge-approved',
    REJECTED: 'badge-rejected',
    CANCELLED: 'badge-cancelled',
  }
  return <span className={map[status] || 'badge-pending'}>{status}</span>
}

export default function BookingsPage() {
  const { user } = useAuth()
  const [bookings, setBookings] = useState([])
  const [loading, setLoading] = useState(true)
  const [activeTab, setActiveTab] = useState('my')

  const fetchBookings = () => {
    setLoading(true)
    const req = activeTab === 'all' && user?.role === 'ADMIN'
      ? bookingsApi.getAll()
      : bookingsApi.getMyBookings()
    req.then(res => setBookings(res.data.data || []))
      .catch(() => {})
      .finally(() => setLoading(false))
  }

  useEffect(() => { fetchBookings() }, [activeTab, user])

  const handleAction = async (id, action) => {
    try {
      if (action === 'approve') await bookingsApi.approve(id)
      else if (action === 'reject') await bookingsApi.reject(id)
      else if (action === 'cancel') await bookingsApi.cancel(id)
      fetchBookings()
    } catch (err) {
      alert(err.response?.data?.message || 'Action failed')
    }
  }

  return (
    <div>
      <div className="mb-6">
        <h1 className="text-2xl font-bold text-gray-900">Bookings</h1>
        <p className="text-gray-500 text-sm mt-1">Manage your resource bookings</p>
      </div>

      {user?.role === 'ADMIN' && (
        <div className="flex gap-2 mb-6">
          {['my', 'all'].map(tab => (
            <button
              key={tab}
              onClick={() => setActiveTab(tab)}
              className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors ${
                activeTab === tab ? 'bg-blue-600 text-white' : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
              }`}
            >
              {tab === 'my' ? 'My Bookings' : 'All Bookings'}
            </button>
          ))}
        </div>
      )}

      {loading ? (
        <div className="flex justify-center py-12">
          <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600"></div>
        </div>
      ) : (
        <div className="card">
          {bookings.length === 0 ? (
            <p className="text-gray-500 text-center py-8">No bookings found</p>
          ) : (
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead>
                  <tr className="text-left border-b border-gray-100">
                    <th className="pb-3 text-sm font-medium text-gray-500">Resource</th>
                    {activeTab === 'all' && <th className="pb-3 text-sm font-medium text-gray-500">User</th>}
                    <th className="pb-3 text-sm font-medium text-gray-500">Date & Time</th>
                    <th className="pb-3 text-sm font-medium text-gray-500">Purpose</th>
                    <th className="pb-3 text-sm font-medium text-gray-500">Status</th>
                    <th className="pb-3 text-sm font-medium text-gray-500">Actions</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-50">
                  {bookings.map(b => (
                    <tr key={b.id}>
                      <td className="py-3 text-sm font-medium text-gray-900">{b.resourceName}</td>
                      {activeTab === 'all' && <td className="py-3 text-sm text-gray-600">{b.userName}</td>}
                      <td className="py-3 text-sm text-gray-600">
                        <div>{new Date(b.startTime).toLocaleDateString()}</div>
                        <div className="text-xs text-gray-400">
                          {new Date(b.startTime).toLocaleTimeString([], {hour:'2-digit', minute:'2-digit'})} - {new Date(b.endTime).toLocaleTimeString([], {hour:'2-digit', minute:'2-digit'})}
                        </div>
                      </td>
                      <td className="py-3 text-sm text-gray-600 max-w-xs truncate">{b.purpose || '-'}</td>
                      <td className="py-3">{statusBadge(b.status)}</td>
                      <td className="py-3">
                        <div className="flex gap-2">
                          {user?.role === 'ADMIN' && b.status === 'PENDING' && (
                            <>
                              <button onClick={() => handleAction(b.id, 'approve')} className="text-xs text-green-600 hover:text-green-700 font-medium">Approve</button>
                              <button onClick={() => handleAction(b.id, 'reject')} className="text-xs text-red-600 hover:text-red-700 font-medium">Reject</button>
                            </>
                          )}
                          {b.status !== 'CANCELLED' && b.status !== 'REJECTED' && (
                            <button onClick={() => handleAction(b.id, 'cancel')} className="text-xs text-gray-500 hover:text-gray-700 font-medium">Cancel</button>
                          )}
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </div>
      )}
    </div>
  )
}
