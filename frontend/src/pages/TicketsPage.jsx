import { useState, useEffect } from 'react'
import { ticketsApi } from '../api/tickets'
import { useAuth } from '../context/AuthContext'

const CATEGORIES = ['ELECTRICAL', 'PLUMBING', 'HVAC', 'IT', 'CLEANING', 'OTHER']
const PRIORITIES = ['LOW', 'MEDIUM', 'HIGH', 'CRITICAL']

const statusBadge = (status) => {
  const map = {
    OPEN: 'badge-open',
    IN_PROGRESS: 'badge-in-progress',
    RESOLVED: 'badge-resolved',
    CLOSED: 'badge-closed',
  }
  return <span className={map[status] || 'badge-open'}>{status.replace('_', ' ')}</span>
}

const priorityColor = { LOW: 'text-gray-500', MEDIUM: 'text-blue-500', HIGH: 'text-orange-500', CRITICAL: 'text-red-600' }

export default function TicketsPage() {
  const { user } = useAuth()
  const [tickets, setTickets] = useState([])
  const [loading, setLoading] = useState(true)
  const [activeTab, setActiveTab] = useState('my')
  const [showCreate, setShowCreate] = useState(false)
  const [selectedTicket, setSelectedTicket] = useState(null)
  const [comments, setComments] = useState([])
  const [newComment, setNewComment] = useState('')
  const [form, setForm] = useState({ title: '', description: '', category: 'OTHER', priority: 'MEDIUM' })
  const [images, setImages] = useState([])
  const [imageError, setImageError] = useState('')

  const fetchTickets = () => {
    setLoading(true)
    const req = (activeTab === 'all' && (user?.role === 'ADMIN' || user?.role === 'TECHNICIAN'))
      ? ticketsApi.getAll()
      : ticketsApi.getMyTickets()
    req.then(res => setTickets(res.data.data || []))
      .catch(() => {})
      .finally(() => setLoading(false))
  }

  useEffect(() => { fetchTickets() }, [activeTab, user])

  const handleCreate = async (e) => {
    e.preventDefault()
    if (images.length > 3) { setImageError('Max 3 images allowed'); return }
    const fd = new FormData()
    fd.append('ticket', new Blob([JSON.stringify(form)], { type: 'application/json' }))
    images.forEach(img => fd.append('images', img))
    try {
      await ticketsApi.create(fd)
      setShowCreate(false)
      setForm({ title: '', description: '', category: 'OTHER', priority: 'MEDIUM' })
      setImages([])
      fetchTickets()
    } catch (err) {
      alert(err.response?.data?.message || 'Failed to create ticket')
    }
  }

  const handleStatusUpdate = async (ticketId, status) => {
    try {
      await ticketsApi.updateStatus(ticketId, status)
      fetchTickets()
      if (selectedTicket?.id === ticketId) {
        setSelectedTicket(prev => ({ ...prev, status }))
      }
    } catch (err) {
      alert(err.response?.data?.message || 'Failed to update status')
    }
  }

  const openTicketDetail = async (ticket) => {
    setSelectedTicket(ticket)
    const res = await ticketsApi.getComments(ticket.id)
    setComments(res.data.data || [])
  }

  const handleAddComment = async () => {
    if (!newComment.trim()) return
    try {
      await ticketsApi.addComment(selectedTicket.id, newComment)
      setNewComment('')
      const res = await ticketsApi.getComments(selectedTicket.id)
      setComments(res.data.data || [])
    } catch (err) {
      alert('Failed to add comment')
    }
  }

  const isAdminOrTech = user?.role === 'ADMIN' || user?.role === 'TECHNICIAN'

  return (
    <div>
      <div className="flex justify-between items-center mb-6">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Maintenance Tickets</h1>
          <p className="text-gray-500 text-sm mt-1">Report and track maintenance issues</p>
        </div>
        <button onClick={() => setShowCreate(true)} className="btn-primary">+ New Ticket</button>
      </div>

      {isAdminOrTech && (
        <div className="flex gap-2 mb-6">
          {['my', 'all'].map(tab => (
            <button key={tab} onClick={() => setActiveTab(tab)}
              className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors ${
                activeTab === tab ? 'bg-blue-600 text-white' : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
              }`}>
              {tab === 'my' ? 'My Tickets' : 'All Tickets'}
            </button>
          ))}
        </div>
      )}

      {loading ? (
        <div className="flex justify-center py-12"><div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600"></div></div>
      ) : (
        <div className="grid grid-cols-1 gap-4">
          {tickets.length === 0 && <p className="text-gray-500 text-center py-12">No tickets found</p>}
          {tickets.map(t => (
            <div key={t.id} className="card hover:shadow-md transition-shadow cursor-pointer" onClick={() => openTicketDetail(t)}>
              <div className="flex items-start justify-between">
                <div className="flex-1">
                  <div className="flex items-center gap-2 mb-1">
                    <span className={`text-xs font-bold ${priorityColor[t.priority]}`}>●</span>
                    <h3 className="font-semibold text-gray-900">{t.title}</h3>
                  </div>
                  <p className="text-sm text-gray-500 line-clamp-2">{t.description}</p>
                  <div className="flex gap-4 mt-2 text-xs text-gray-400">
                    <span>{t.category}</span>
                    {t.assigneeName && <span>Assigned: {t.assigneeName}</span>}
                    {t.responseTimeMinutes && <span>⏱ {t.responseTimeMinutes}m response</span>}
                  </div>
                </div>
                <div className="ml-4">{statusBadge(t.status)}</div>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* Create Ticket Modal */}
      {showCreate && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-xl shadow-xl w-full max-w-lg p-6 max-h-screen overflow-y-auto">
            <h2 className="text-lg font-semibold mb-4">New Maintenance Ticket</h2>
            <form onSubmit={handleCreate} className="space-y-4">
              <input required placeholder="Title" value={form.title} onChange={e => setForm({...form, title: e.target.value})} className="input-field" />
              <textarea required placeholder="Description" value={form.description} onChange={e => setForm({...form, description: e.target.value})} className="input-field h-24 resize-none" />
              <select value={form.category} onChange={e => setForm({...form, category: e.target.value})} className="input-field">
                {CATEGORIES.map(c => <option key={c}>{c}</option>)}
              </select>
              <select value={form.priority} onChange={e => setForm({...form, priority: e.target.value})} className="input-field">
                {PRIORITIES.map(p => <option key={p}>{p}</option>)}
              </select>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Images (max 3)</label>
                <input type="file" accept="image/*" multiple onChange={e => {
                  const files = Array.from(e.target.files)
                  if (files.length > 3) { setImageError('Max 3 images'); return }
                  setImageError('')
                  setImages(files)
                }} className="input-field" />
                {imageError && <p className="text-red-500 text-xs mt-1">{imageError}</p>}
              </div>
              <div className="flex gap-3 justify-end">
                <button type="button" onClick={() => setShowCreate(false)} className="btn-secondary">Cancel</button>
                <button type="submit" className="btn-primary">Submit</button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Ticket Detail Modal */}
      {selectedTicket && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-xl shadow-xl w-full max-w-2xl p-6 max-h-[90vh] overflow-y-auto">
            <div className="flex justify-between items-start mb-4">
              <h2 className="text-lg font-semibold">{selectedTicket.title}</h2>
              <button onClick={() => setSelectedTicket(null)} className="text-gray-400 hover:text-gray-600">✕</button>
            </div>
            <div className="space-y-3 mb-4">
              <p className="text-sm text-gray-600">{selectedTicket.description}</p>
              <div className="flex gap-4 text-sm text-gray-500">
                <span>Category: {selectedTicket.category}</span>
                <span>Priority: <span className={`font-medium ${priorityColor[selectedTicket.priority]}`}>{selectedTicket.priority}</span></span>
              </div>
              <div>{statusBadge(selectedTicket.status)}</div>
            </div>

            {isAdminOrTech && selectedTicket.status !== 'CLOSED' && (
              <div className="flex gap-2 mb-4 flex-wrap">
                {selectedTicket.status === 'OPEN' && <button onClick={() => handleStatusUpdate(selectedTicket.id, 'IN_PROGRESS')} className="btn-secondary text-sm">Start Progress</button>}
                {selectedTicket.status === 'IN_PROGRESS' && <button onClick={() => handleStatusUpdate(selectedTicket.id, 'RESOLVED')} className="btn-secondary text-sm">Mark Resolved</button>}
                {(selectedTicket.status === 'IN_PROGRESS' || selectedTicket.status === 'RESOLVED') && (
                  <button onClick={() => handleStatusUpdate(selectedTicket.id, 'CLOSED')} className="btn-secondary text-sm">Close</button>
                )}
              </div>
            )}

            <div className="border-t pt-4">
              <h3 className="text-sm font-semibold text-gray-700 mb-3">Comments ({comments.length})</h3>
              <div className="space-y-3 max-h-48 overflow-y-auto mb-4">
                {comments.map(c => (
                  <div key={c.id} className="bg-gray-50 rounded-lg p-3">
                    <div className="flex justify-between items-center mb-1">
                      <span className="text-xs font-medium text-gray-700">{c.userName}</span>
                      <span className="text-xs text-gray-400">{new Date(c.createdAt).toLocaleDateString()}</span>
                    </div>
                    <p className="text-sm text-gray-600">{c.content}</p>
                  </div>
                ))}
                {comments.length === 0 && <p className="text-xs text-gray-400 text-center py-2">No comments yet</p>}
              </div>
              <div className="flex gap-2">
                <input
                  type="text"
                  placeholder="Add a comment..."
                  value={newComment}
                  onChange={e => setNewComment(e.target.value)}
                  onKeyDown={e => e.key === 'Enter' && handleAddComment()}
                  className="input-field flex-1"
                />
                <button onClick={handleAddComment} className="btn-primary text-sm">Send</button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}
