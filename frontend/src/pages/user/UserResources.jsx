// // // import { useEffect, useState } from 'react';
// // // import { resourcesApi } from '../../api/resources';

// // // export default function UserResources() {
// // //   const [resources, setResources] = useState([]);
// // //   useEffect(() => {
// // //     resourcesApi.getAvailable().then(res => setResources(res.data.data)).catch(() => {});
// // //   }, []);

// // //   return (
// // //     <div>
// // //       <h1 className="text-2xl font-bold mb-4">Resources</h1>
// // //       <table className="w-full border">
// // //         <thead>
// // //           <tr className="bg-gray-100">
// // //             <th className="p-2">Name</th>
// // //             <th className="p-2">Type</th>
// // //             <th className="p-2">Capacity</th>
// // //             <th className="p-2">Availability</th>
// // //           </tr>
// // //         </thead>
// // //         <tbody>
// // //           {resources.map(r => (
// // //             <tr key={r.id} className="border-t">
// // //               <td className="p-2">{r.name}</td>
// // //               <td className="p-2">{r.type}</td>
// // //               <td className="p-2">{r.capacity}</td>
// // //               <td className="p-2">{r.status}</td>
// // //             </tr>
// // //           ))}
// // //         </tbody>
// // //       </table>
// // //     </div>
// // //   )
// // // }


// // //frontend/src/pages/user/UserResources.jsx
// // import { useEffect, useState } from 'react';
// // import { resourcesApi } from '../../api/resources';
// // import { useNavigate } from 'react-router-dom';

// // export default function UserResources() {
// //   const [resources, setResources] = useState([]);
// //   const navigate = useNavigate();

// //   useEffect(() => {
// //     resourcesApi.getAvailable()
// //       .then(res => setResources(res.data.data))
// //       .catch(err => console.error(err));
// //   }, []);

// //   return (
// //     <div className="p-6">
// //       <h1 className="text-2xl font-bold mb-4">Available Resources</h1>
// //       <div className="overflow-x-auto">
// //         <table className="w-full border border-gray-200 rounded-lg">
// //           <thead className="bg-gray-100 text-left">
// //             <tr>
// //               <th className="p-2 border-b">Image</th>
// //               <th className="p-2 border-b">Name</th>
// //               <th className="p-2 border-b">Type</th>
// //               <th className="p-2 border-b">Capacity</th>
// //               <th className="p-2 border-b">Status</th>
// //               <th className="p-2 border-b">Action</th>
// //             </tr>
// //           </thead>
// //           <tbody>
// //             {resources.map(r => (
// //               <tr key={r.id} className="border-b hover:bg-gray-50">
// //                 <td className="p-2">
// //                   {r.imageUrl ? <img src={r.imageUrl} alt={r.name} className="h-12 w-12 object-cover rounded" /> : 'No Image'}
// //                 </td>
// //                 <td className="p-2">{r.name}</td>
// //                 <td className="p-2">{r.type}</td>
// //                 <td className="p-2">{r.capacity}</td>
// //                 <td className="p-2">{r.status}</td>
// //                 <td className="p-2">
// //                   <button
// //                     onClick={() => navigate(`/bookings/new/${r.id}`)}
// //                     className="px-3 py-1 bg-blue-500 text-white rounded hover:bg-blue-600"
// //                   >
// //                     Book
// //                   </button>
// //                 </td>
// //               </tr>
// //             ))}
// //           </tbody>
// //         </table>
// //       </div>
// //     </div>
// //   )
// // }

// // frontend/src/pages/user/UserResources.jsx

// import { useEffect, useState } from 'react';
// import { resourcesApi } from '../../api/resources';
// import { useNavigate } from 'react-router-dom';

// export default function UserResources() {
//   const [resources, setResources] = useState([]);
//   const navigate = useNavigate();

//   useEffect(() => {
//     resourcesApi.getAvailable()
//       .then(res => {
//         setResources(res.data); // ✅ FIX
//       })
//       .catch(err => console.error(err));
//   }, []);

//   return (
//     <div className="p-6">
//       <h1 className="text-2xl font-bold mb-4">Available Resources</h1>

//       <div className="grid grid-cols-3 gap-6">
//         {resources.map(r => (
//           <div key={r.id} className="bg-white shadow rounded p-4">

//             <img
//               src={`http://localhost:8083${r.imageUrl}`}
//               className="w-full h-40 object-cover rounded"
//             />

//             <h2 className="text-lg font-bold mt-2">{r.name}</h2>
//             <p>{r.type}</p>
//             <p>Capacity: {r.capacity}</p>

//             <button
//               onClick={() => navigate(`/user/book/${r.id}`)}
//               className="mt-3 w-full bg-blue-500 text-white p-2 rounded"
//             >
//               Book Now
//             </button>

//           </div>
//         ))}
//       </div>
//     </div>
//   );
// }

import { useEffect, useState } from 'react';
import { resourcesApi } from '../../api/resources';
import { useNavigate } from 'react-router-dom';
import { Box, Users, Tag, ArrowRight, Search } from 'lucide-react';

export default function UserResources() {
  const [resources, setResources] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    resourcesApi.getAvailable()
      .then(res => {
        setResources(res.data);
      })
      .catch(err => console.error(err));
  }, []);

  return (
    <div className="space-y-8">
      {/* Header Section */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h1 className="text-3xl font-black text-slate-800 tracking-tight">
            Available Resources
          </h1>
          <p className="text-slate-500 mt-1 font-medium">
            Select a workspace or equipment to begin your reservation.
          </p>
        </div>

        {/* Search Bar Placeholder (Visual only) */}
        <div className="relative">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400 w-5 h-5" />
          <input 
            type="text" 
            placeholder="Search resources..." 
            className="pl-10 pr-4 py-2.5 bg-white border border-slate-200 rounded-xl w-full md:w-64 focus:ring-2 focus:ring-indigo-500 outline-none transition-all shadow-sm"
          />
        </div>
      </div>

      {/* Grid Section */}
      {resources.length === 0 ? (
        <div className="bg-white rounded-3xl p-20 text-center border-2 border-dashed border-slate-200">
           <Box className="w-16 h-16 text-slate-200 mx-auto mb-4" />
           <p className="text-slate-500 font-bold text-xl">No resources available right now.</p>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {resources.map((r) => (
            <div 
              key={r.id} 
              className="group bg-white rounded-2xl border border-slate-200 overflow-hidden hover:shadow-2xl hover:shadow-indigo-100 hover:-translate-y-1 transition-all duration-300"
            >
              {/* Image Container */}
              <div className="relative h-52 overflow-hidden">
                <img
                  src={`http://localhost:8083${r.imageUrl}`}
                  alt={r.name}
                  className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                />
                <div className="absolute top-4 left-4">
                  <span className="bg-white/90 backdrop-blur px-3 py-1 rounded-lg text-xs font-bold text-indigo-600 shadow-sm flex items-center gap-1.5 uppercase tracking-wider">
                    <Tag className="w-3.5 h-3.5" />
                    {r.type}
                  </span>
                </div>
              </div>

              {/* Content Section */}
              <div className="p-6">
                <h2 className="text-xl font-bold text-slate-800 group-hover:text-indigo-600 transition-colors">
                  {r.name}
                </h2>
                
                <div className="mt-4 flex items-center gap-6 text-slate-500">
                  <div className="flex items-center gap-2">
                    <Users className="w-4 h-4 text-indigo-500" />
                    <span className="text-sm font-medium">Capacity: <b className="text-slate-700">{r.capacity}</b></span>
                  </div>
                </div>

                <button
                  onClick={() => navigate(`/user/book/${r.id}`)}
                  className="mt-6 w-full group/btn relative flex items-center justify-center gap-2 bg-slate-900 hover:bg-indigo-600 text-white py-3.5 rounded-xl font-bold transition-all overflow-hidden"
                >
                  <span className="relative z-10 flex items-center gap-2">
                    Book Now
                    <ArrowRight className="w-4 h-4 group-hover/btn:translate-x-1 transition-transform" />
                  </span>
                </button>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}