// // import { useEffect, useState } from 'react';
// // import { resourcesApi } from '../../api/resources';

// // export default function UserResources() {
// //   const [resources, setResources] = useState([]);
// //   useEffect(() => {
// //     resourcesApi.getAvailable().then(res => setResources(res.data.data)).catch(() => {});
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
// //             <th className="p-2">Availability</th>
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


// //frontend/src/pages/user/UserResources.jsx
// import { useEffect, useState } from 'react';
// import { resourcesApi } from '../../api/resources';
// import { useNavigate } from 'react-router-dom';

// export default function UserResources() {
//   const [resources, setResources] = useState([]);
//   const navigate = useNavigate();

//   useEffect(() => {
//     resourcesApi.getAvailable()
//       .then(res => setResources(res.data.data))
//       .catch(err => console.error(err));
//   }, []);

//   return (
//     <div className="p-6">
//       <h1 className="text-2xl font-bold mb-4">Available Resources</h1>
//       <div className="overflow-x-auto">
//         <table className="w-full border border-gray-200 rounded-lg">
//           <thead className="bg-gray-100 text-left">
//             <tr>
//               <th className="p-2 border-b">Image</th>
//               <th className="p-2 border-b">Name</th>
//               <th className="p-2 border-b">Type</th>
//               <th className="p-2 border-b">Capacity</th>
//               <th className="p-2 border-b">Status</th>
//               <th className="p-2 border-b">Action</th>
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
//                 <td className="p-2">
//                   <button
//                     onClick={() => navigate(`/bookings/new/${r.id}`)}
//                     className="px-3 py-1 bg-blue-500 text-white rounded hover:bg-blue-600"
//                   >
//                     Book
//                   </button>
//                 </td>
//               </tr>
//             ))}
//           </tbody>
//         </table>
//       </div>
//     </div>
//   )
// }

// frontend/src/pages/user/UserResources.jsx

import { useEffect, useState } from 'react';
import { resourcesApi } from '../../api/resources';
import { useNavigate } from 'react-router-dom';

export default function UserResources() {
  const [resources, setResources] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    resourcesApi.getAvailable()
      .then(res => {
        setResources(res.data); // ✅ FIX
      })
      .catch(err => console.error(err));
  }, []);

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-4">Available Resources</h1>

      <div className="grid grid-cols-3 gap-6">
        {resources.map(r => (
          <div key={r.id} className="bg-white shadow rounded p-4">

            <img
              src={`http://localhost:8083${r.imageUrl}`}
              className="w-full h-40 object-cover rounded"
            />

            <h2 className="text-lg font-bold mt-2">{r.name}</h2>
            <p>{r.type}</p>
            <p>Capacity: {r.capacity}</p>

            <button
              onClick={() => navigate(`/user/book/${r.id}`)}
              className="mt-3 w-full bg-blue-500 text-white p-2 rounded"
            >
              Book Now
            </button>

          </div>
        ))}
      </div>
    </div>
  );
}