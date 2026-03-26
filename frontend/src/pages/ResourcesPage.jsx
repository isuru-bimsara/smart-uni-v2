import { useState, useEffect } from 'react'
import { resourcesApi } from '../api/resources'
import { useAuth } from '../context/AuthContext'
import BookingModal from '../components/BookingModal'

const RESOURCE_TYPES = ['ALL', 'LECTURE_HALL', 'LAB', 'SPORTS_FACILITY', 'MEETING_ROOM', 'AUDITORIUM', 'EQUIPMENT', 'OTHER']

function ResourceCard({ resource, onBook }) {
  const statusColors = {
    AVAILABLE: 'text-green-600 bg-green-50',
    UNAVAILABLE: 'text-red-600 bg-red-50',
    MAINTENANCE: 'text-yellow-600 bg-yellow-50',
  }

  return (
    <div className="card hover:shadow-md transition-shadow">
      <div className="flex justify-between items-start mb-3">
        <div>
          <h3 className="font-semibold text-gray-900">{resource.name}</h3>
          <p className="text-xs text-gray-500 mt-0.5">{resource.type?.replace('_', ' ')}</p>
        </div>
        <span className={`text-xs font-medium px-2 py-1 rounded-full ${statusColors[resource.status] || 'text-gray-600 bg-gray-50'}`}>
          {resource.status}
        </span>
      </div>

      {resource.description && (
        <p className="text-sm text-gray-600 mb-3 line-clamp-2">{resource.description}</p>
      )}

      <div className="flex items-center gap-4 text-xs text-gray-500 mb-4">
        {resource.location && <span>📍 {resource.location}</span>}
        {resource.capacity && <span>👥 {resource.capacity} people</span>}
      </div>

      {resource.status === 'AVAILABLE' && (
        <button
          onClick={() => onBook(resource)}
          className="btn-primary text-sm w-full"
        >
          Book Now
        </button>
      )}
    </div>
  )
}

export default function ResourcesPage() {
  const { user } = useAuth()
  const [resources, setResources] = useState([])
  const [loading, setLoading] = useState(true)
  const [search, setSearch] = useState('')
  const [typeFilter, setTypeFilter] = useState('ALL')
  const [selectedResource, setSelectedResource] = useState(null)
  const [showBookingModal, setShowBookingModal] = useState(false)
  const [showCreateModal, setShowCreateModal] = useState(false)
  const [form, setForm] = useState({ name: '', description: '', type: 'LECTURE_HALL', location: '', capacity: '' })

  const fetchResources = () => {
    setLoading(true)
    const params = {}
    if (search) params.search = search
    if (typeFilter !== 'ALL') params.type = typeFilter
    resourcesApi.getAll(params)
      .then(res => setResources(res.data.data || []))
      .catch(() => {})
      .finally(() => setLoading(false))
  }

  useEffect(() => { fetchResources() }, [search, typeFilter])

  const handleBook = (resource) => {
    setSelectedResource(resource)
    setShowBookingModal(true)
  }

  const handleCreate = async (e) => {
    e.preventDefault()
    try {
      await resourcesApi.create({ ...form, capacity: parseInt(form.capacity) || null })
      setShowCreateModal(false)
      setForm({ name: '', description: '', type: 'LECTURE_HALL', location: '', capacity: '' })
      fetchResources()
    } catch (err) {
      alert(err.response?.data?.message || 'Failed to create resource')
    }
  }

  return (
    <div>
      <div className="flex justify-between items-center mb-6">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Facilities & Resources</h1>
          <p className="text-gray-500 text-sm mt-1">Browse and book campus facilities</p>
        </div>
        {user?.role === 'ADMIN' && (
          <button onClick={() => setShowCreateModal(true)} className="btn-primary">
            + Add Resource
          </button>
        )}
      </div>

      <div className="flex gap-4 mb-6">
        <input
          type="text"
          placeholder="Search resources..."
          value={search}
          onChange={e => setSearch(e.target.value)}
          className="input-field max-w-xs"
        />
        <select
          value={typeFilter}
          onChange={e => setTypeFilter(e.target.value)}
          className="input-field max-w-xs"
        >
          {RESOURCE_TYPES.map(t => (
            <option key={t} value={t}>{t.replace('_', ' ')}</option>
          ))}
        </select>
      </div>

      {loading ? (
        <div className="flex justify-center py-12">
          <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600"></div>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {resources.map(resource => (
            <ResourceCard key={resource.id} resource={resource} onBook={handleBook} />
          ))}
          {resources.length === 0 && (
            <div className="col-span-3 text-center py-12 text-gray-500">
              No resources found
            </div>
          )}
        </div>
      )}

      {showBookingModal && selectedResource && (
        <BookingModal
          resource={selectedResource}
          onClose={() => { setShowBookingModal(false); setSelectedResource(null) }}
          onSuccess={() => { setShowBookingModal(false); setSelectedResource(null) }}
        />
      )}

      {showCreateModal && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-xl shadow-xl w-full max-w-md p-6">
            <h2 className="text-lg font-semibold mb-4">Add New Resource</h2>
            <form onSubmit={handleCreate} className="space-y-4">
              <input required placeholder="Name" value={form.name} onChange={e => setForm({...form, name: e.target.value})} className="input-field" />
              <textarea placeholder="Description" value={form.description} onChange={e => setForm({...form, description: e.target.value})} className="input-field h-24 resize-none" />
              <select value={form.type} onChange={e => setForm({...form, type: e.target.value})} className="input-field">
                {RESOURCE_TYPES.filter(t => t !== 'ALL').map(t => <option key={t}>{t}</option>)}
              </select>
              <input placeholder="Location" value={form.location} onChange={e => setForm({...form, location: e.target.value})} className="input-field" />
              <input type="number" placeholder="Capacity" value={form.capacity} onChange={e => setForm({...form, capacity: e.target.value})} className="input-field" />
              <div className="flex gap-3 justify-end">
                <button type="button" onClick={() => setShowCreateModal(false)} className="btn-secondary">Cancel</button>
                <button type="submit" className="btn-primary">Create</button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  )
}
