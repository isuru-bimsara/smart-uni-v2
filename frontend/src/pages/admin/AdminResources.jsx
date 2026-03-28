// // import { useEffect, useState } from 'react';
// // import { resourcesApi } from '../../api/resources';

// // export default function AdminResources() {
// //   const [resources, setResources] = useState([]);
// //   useEffect(() => {
// //     resourcesApi.getAll().then(res => setResources(res.data.data)).catch(() => {});
// //   }, []);

// //   return (
// //     <div>
// //       <h1 className="text-2xl font-bold mb-4">Resources</h1>
// //       <table className="w-full border">
// //         <thead>
// //           <tr className="bg-gray-100">
// //             <th className="p-2">Name</th>
// //             <th className="p-2">Type</th>
// //             <th className="p-2">Capacity</th>
// //             <th className="p-2">Status</th>
// //           </tr>
// //         </thead>
// //         <tbody>
// //           {resources.map(r => (
// //             <tr key={r.id} className="border-t">
// //               <td className="p-2">{r.name}</td>
// //               <td className="p-2">{r.type}</td>
// //               <td className="p-2">{r.capacity}</td>
// //               <td className="p-2">{r.status}</td>
// //             </tr>
// //           ))}
// //         </tbody>
// //       </table>
// //     </div>
// //   )
// // }

// import { useEffect, useState } from 'react';
// import { resourcesApi } from '../../api/resources';

// export default function AdminResources() {
//   const [resources, setResources] = useState([]);

//   const fetchResources = async () => {
//     const res = await resourcesApi.getAll();
//     setResources(res.data.data);
//   }

//   useEffect(() => { fetchResources() }, []);

//   return (
//     <div className="p-6">
//       <h1 className="text-2xl font-bold mb-4">Manage Resources</h1>
//       <div className="overflow-x-auto">
//         <table className="w-full border border-gray-200 rounded-lg">
//           <thead className="bg-gray-100 text-left">
//             <tr>
//               <th className="p-2 border-b">Image</th>
//               <th className="p-2 border-b">Name</th>
//               <th className="p-2 border-b">Type</th>
//               <th className="p-2 border-b">Capacity</th>
//               <th className="p-2 border-b">Status</th>
//             </tr>
//           </thead>
//           <tbody>
//             {resources.map(r => (
//               <tr key={r.id} className="border-b hover:bg-gray-50">
//                 <td className="p-2">
//                   {r.imageUrl ? <img src={r.imageUrl} alt={r.name} className="h-12 w-12 object-cover rounded" /> : 'No Image'}
//                 </td>
//                 <td className="p-2">{r.name}</td>
//                 <td className="p-2">{r.type}</td>
//                 <td className="p-2">{r.capacity}</td>
//                 <td className="p-2">{r.status}</td>
//               </tr>
//             ))}
//           </tbody>
//         </table>
//       </div>
//     </div>
//   )
// }


import { useEffect, useState } from 'react';
import axios from 'axios';

export default function AdminResources() {
  const [resources, setResources] = useState([]);
  const [form, setForm] = useState({
    id: null,
    name: '',
    type: '',
    capacity: '',
    status: 'AVAILABLE',
    description: '',
    location: '',
    imageUrl: ''
  });
  const [file, setFile] = useState(null);

  const fetchResources = async () => {
    try {
      const res = await axios.get('/api/resources');
      setResources(res.data);
    } catch (err) {
      console.error(err);
      alert('Failed to fetch resources');
    }
  };

  useEffect(() => { fetchResources(); }, []);

  const handleChange = e => setForm({ ...form, [e.target.name]: e.target.value });
  const handleFileChange = e => setFile(e.target.files[0]);

  const uploadImage = async () => {
    if (!file) return form.imageUrl || '';
    const formData = new FormData();
    formData.append('file', file);
    const res = await axios.post('/api/resources/upload', formData, {
      headers: { 'Content-Type': 'multipart/form-data' }
    });
    return res.data; // uploaded file URL
  };

  const handleSubmit = async e => {
    e.preventDefault();
    try {
      const imageUrl = await uploadImage();
      const payload = { ...form, imageUrl };

      if (form.id) {
        await axios.put(`/api/resources/${form.id}`, payload);
      } else {
        await axios.post(`/api/resources`, payload);
      }

      setForm({ id: null, name: '', type: '', capacity: '', status: 'AVAILABLE', description: '', location: '', imageUrl: '' });
      setFile(null);
      fetchResources();
    } catch (err) {
      console.error(err);
      alert('Error: ' + (err.response?.data?.message || err.message));
    }
  };

  const handleEdit = r => setForm({ ...r, type: r.type || '' });
  const handleDelete = async id => {
    if (window.confirm('Delete this resource?')) {
      await axios.delete(`/api/resources/${id}`);
      fetchResources();
    }
  };

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-4">Manage Resources</h1>

      <form onSubmit={handleSubmit} className="mb-6 p-4 border rounded bg-gray-50">
        <div className="flex gap-4 flex-wrap">
          <input type="text" name="name" placeholder="Name" value={form.name} onChange={handleChange} className="border p-2 rounded" required />
          <select name="type" value={form.type} onChange={handleChange} required className="border p-2 rounded">
            <option value="">Select Type</option>
            <option value="LECTURE_HALL">Lecture Hall</option>
            <option value="LAB">Lab</option>
            <option value="MEETING_ROOM">Meeting Room</option>
            <option value="EQUIPMENT">Equipment</option>
          </select>
          <input type="number" name="capacity" placeholder="Capacity" value={form.capacity} onChange={handleChange} className="border p-2 rounded" required />
          <select name="status" value={form.status} onChange={handleChange} className="border p-2 rounded">
            <option value="AVAILABLE">AVAILABLE</option>
            <option value="UNAVAILABLE">UNAVAILABLE</option>
          </select>
          <input type="text" name="location" placeholder="Location" value={form.location} onChange={handleChange} className="border p-2 rounded" />
          <input type="text" name="description" placeholder="Description" value={form.description} onChange={handleChange} className="border p-2 rounded" />
          <input type="file" onChange={handleFileChange} className="border p-2 rounded" />
          <button type="submit" className="bg-blue-500 text-white px-4 py-2 rounded">{form.id ? 'Update' : 'Create'}</button>
        </div>
      </form>

      <div className="overflow-x-auto">
        <table className="w-full border border-gray-200 rounded-lg">
          <thead className="bg-gray-100 text-left">
            <tr>
              <th className="p-2 border-b">Image</th>
              <th className="p-2 border-b">Name</th>
              <th className="p-2 border-b">Type</th>
              <th className="p-2 border-b">Capacity</th>
              <th className="p-2 border-b">Status</th>
              <th className="p-2 border-b">Actions</th>
            </tr>
          </thead>
          <tbody>
            {resources.map(r => (
              <tr key={r.id} className="border-b hover:bg-gray-50">
                <td className="p-2">{r.imageUrl ? <img src={r.imageUrl} alt={r.name} className="h-12 w-12 object-cover rounded" /> : 'No Image'}</td>
                <td className="p-2">{r.name}</td>
                <td className="p-2">{r.type}</td>
                <td className="p-2">{r.capacity}</td>
                <td className="p-2">{r.status}</td>
                <td className="p-2 flex gap-2">
                  <button onClick={() => handleEdit(r)} className="bg-yellow-400 px-2 py-1 rounded">Edit</button>
                  <button onClick={() => handleDelete(r.id)} className="bg-red-500 text-white px-2 py-1 rounded">Delete</button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}