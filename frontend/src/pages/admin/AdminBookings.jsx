// // // //frontend/src/pages/admin/AdminBookings.jsx
// // // import { useState, useEffect } from "react";
// // // import { bookingsApi } from "../../api/bookings";
// // // import { formatDistanceToNowStrict } from "date-fns";

// // // export default function AdminBookings() {
// // //   const [bookings, setBookings] = useState([]);
// // //   const [loading, setLoading] = useState(true);

// // //   // Fetch all bookings
// // //   const fetchBookings = async () => {
// // //     try {
// // //       const res = await bookingsApi.getAll();
// // //       const updatedBookings = res.data.data.map((b) => {
// // //         // Auto-cancel if endTime passed
// // //         const now = new Date();
// // //         if (new Date(b.endTime) < now && b.status === "PENDING") {
// // //           b.status = "CANCELLED";
// // //           b.autoCancelled = true;
// // //         }
// // //         return b;
// // //       });
// // //       setBookings(updatedBookings);
// // //     } catch (err) {
// // //       console.error(err);
// // //     } finally {
// // //       setLoading(false);
// // //     }
// // //   };

// // //   useEffect(() => {
// // //     fetchBookings();
// // //     const interval = setInterval(fetchBookings, 60 * 1000); // refresh every 1 min
// // //     return () => clearInterval(interval);
// // //   }, []);

// // //   // Admin actions
// // //   const handleStatusChange = async (id, action) => {
// // //     try {
// // //       let res;
// // //       switch (action) {
// // //         case "approve":
// // //           res = await bookingsApi.approve(id);
// // //           break;
// // //         case "reject":
// // //           res = await bookingsApi.reject(id);
// // //           break;
// // //         case "cancel":
// // //           res = await bookingsApi.cancel(id);
// // //           break;
// // //         default:
// // //           return;
// // //       }
// // //       setBookings((prev) => prev.map((b) => (b.id === id ? res.data.data : b)));
// // //     } catch (err) {
// // //       console.error(err);
// // //       alert("Failed to update status");
// // //     }
// // //   };

// // //   const renderCancelledTime = (booking) => {
// // //     if (booking.status !== "CANCELLED") return "-";
// // //     const endTime = new Date(booking.endTime);
// // //     const cancelTime = booking.updatedAt
// // //       ? new Date(booking.updatedAt)
// // //       : new Date();
// // //     const diff = endTime - cancelTime;
// // //     return diff > 0
// // //       ? formatDistanceToNowStrict(cancelTime, { addSuffix: true })
// // //       : "After end time";
// // //   };

// // //   if (loading) return <p>Loading bookings...</p>;

// // //   return (
// // //     <div className="p-6">
// // //       <h1 className="text-2xl font-bold mb-4">All Bookings</h1>
// // //       <div className="overflow-x-auto">
// // //         <table className="w-full border border-gray-200 rounded-lg">
// // //           <thead className="bg-gray-100 text-left">
// // //             <tr>
// // //               <th className="p-2 border-b">Resource</th>
// // //               <th className="p-2 border-b">User</th>
// // //               <th className="p-2 border-b">Start Time</th>
// // //               <th className="p-2 border-b">End Time</th>
// // //               <th className="p-2 border-b">Status</th>
// // //               <th className="p-2 border-b">Cancelled Time</th>
// // //               <th className="p-2 border-b">Actions</th>
// // //             </tr>
// // //           </thead>
// // //           <tbody>
// // //             {bookings.map((b) => (
// // //               <tr key={b.id} className="border-b hover:bg-gray-50">
// // //                 <td className="p-2">{b.resourceName}</td>
// // //                 <td className="p-2">{b.userName}</td>
// // //                 <td className="p-2">
// // //                   {new Date(b.startTime).toLocaleString()}
// // //                 </td>
// // //                 <td className="p-2">{new Date(b.endTime).toLocaleString()}</td>
// // //                 <td
// // //                   className={`p-2 font-semibold ${b.status === "APPROVED" ? "text-green-600" : b.status === "REJECTED" ? "text-red-600" : b.status === "CANCELLED" ? "text-orange-600" : "text-gray-600"}`}
// // //                 >
// // //                   {b.status}
// // //                   {b.autoCancelled ? " (auto)" : ""}
// // //                 </td>
// // //                 <td className="p-2">{renderCancelledTime(b)}</td>
// // //                 <td className="p-2 space-x-2">
// // //                   {b.status === "PENDING" && (
// // //                     <>
// // //                       <button
// // //                         onClick={() => handleStatusChange(b.id, "approve")}
// // //                         className="px-2 py-1 bg-green-500 text-white rounded hover:bg-green-600"
// // //                       >
// // //                         Approve
// // //                       </button>
// // //                       <button
// // //                         onClick={() => handleStatusChange(b.id, "reject")}
// // //                         className="px-2 py-1 bg-red-500 text-white rounded hover:bg-red-600"
// // //                       >
// // //                         Reject
// // //                       </button>
// // //                       <button
// // //                         onClick={() => handleStatusChange(b.id, "cancel")}
// // //                         className="px-2 py-1 bg-orange-500 text-white rounded hover:bg-orange-600"
// // //                       >
// // //                         Cancel
// // //                       </button>
// // //                     </>
// // //                   )}
// // //                   {b.status === "APPROVED" && (
// // //                     <button
// // //                       onClick={() => handleStatusChange(b.id, "cancel")}
// // //                       className="px-2 py-1 bg-orange-500 text-white rounded hover:bg-orange-600"
// // //                     >
// // //                       Cancel
// // //                     </button>
// // //                   )}
// // //                 </td>
// // //               </tr>
// // //             ))}
// // //           </tbody>
// // //         </table>
// // //       </div>
// // //     </div>
// // //   );
// // // }


// // import { useState, useEffect } from "react";
// // import { bookingsApi } from "../../api/bookings";
// // import { formatDistanceToNowStrict } from "date-fns";
// // import {
// //   Calendar,
// //   Clock,
// //   CheckCircle,
// //   XCircle,
// //   Ban,
// //   Loader2,
// // } from "lucide-react";

// // export default function AdminBookings() {
// //   const [bookings, setBookings] = useState([]);
// //   const [loading, setLoading] = useState(true);

// //   const fetchBookings = async () => {
// //     try {
// //       const res = await bookingsApi.getAll();
// //       const updated = res.data.data.map((b) => {
// //         const now = new Date();
// //         if (new Date(b.endTime) < now && b.status === "PENDING") {
// //           b.status = "CANCELLED";
// //           b.autoCancelled = true;
// //         }
// //         return b;
// //       });
// //       setBookings(updated);
// //     } catch (err) {
// //       console.error(err);
// //     } finally {
// //       setLoading(false);
// //     }
// //   };

// //   useEffect(() => {
// //     fetchBookings();
// //     const interval = setInterval(fetchBookings, 60000);
// //     return () => clearInterval(interval);
// //   }, []);

// //   const handleStatusChange = async (id, action) => {
// //     try {
// //       let res;
// //       if (action === "approve") res = await bookingsApi.approve(id);
// //       if (action === "reject") res = await bookingsApi.reject(id);
// //       if (action === "cancel") res = await bookingsApi.cancel(id);

// //       setBookings((prev) =>
// //         prev.map((b) => (b.id === id ? res.data.data : b))
// //       );
// //     } catch {
// //       alert("Failed to update status");
// //     }
// //   };

// //   const getStatusStyle = (status) => {
// //     const map = {
// //       APPROVED: "bg-emerald-50 text-emerald-700 border-emerald-200",
// //       PENDING: "bg-amber-50 text-amber-700 border-amber-200",
// //       REJECTED: "bg-rose-50 text-rose-700 border-rose-200",
// //       CANCELLED: "bg-slate-100 text-slate-600 border-slate-200",
// //     };
// //     return map[status] || "bg-blue-50 text-blue-700 border-blue-200";
// //   };

// //   const renderCancelledTime = (b) => {
// //     if (b.status !== "CANCELLED") return "-";
// //     const cancelTime = b.updatedAt
// //       ? new Date(b.updatedAt)
// //       : new Date();
// //     return formatDistanceToNowStrict(cancelTime, { addSuffix: true });
// //   };

// //   if (loading)
// //     return (
// //       <div className="flex items-center justify-center h-60">
// //         <Loader2 className="w-8 h-8 animate-spin text-indigo-600" />
// //       </div>
// //     );

// //   return (
// //     <div className="max-w-7xl mx-auto space-y-8 pb-20">
// //       {/* HEADER */}
// //       <div className="flex items-center gap-3">
// //         <div className="p-3 bg-indigo-600 rounded-2xl shadow-lg shadow-indigo-100">
// //           <Calendar className="text-white w-6 h-6" />
// //         </div>
// //         <div>
// //           <h1 className="text-3xl font-black text-slate-800">
// //             Booking Management
// //           </h1>
// //           <p className="text-slate-500">
// //             Monitor and control all resource reservations.
// //           </p>
// //         </div>
// //       </div>

// //       {/* TABLE */}
// //       <div className="bg-white rounded-3xl border border-slate-200 shadow-sm overflow-hidden">
// //         <div className="p-6 border-b border-slate-100 flex justify-between items-center">
// //           <h3 className="text-lg font-bold text-slate-800 flex items-center gap-2">
// //             <Clock className="w-5 h-5 text-indigo-600" />
// //             All Bookings
// //           </h3>
// //         </div>

// //         <div className="overflow-x-auto">
// //           {bookings.length === 0 ? (
// //             <div className="p-16 text-center">
// //               <p className="text-slate-500 font-bold">No bookings found</p>
// //             </div>
// //           ) : (
// //             <table className="w-full text-left">
// //               <thead>
// //                 <tr className="bg-slate-50/50">
// //                   <th className="px-6 py-4 text-xs font-black text-slate-400 uppercase">
// //                     Resource
// //                   </th>
// //                   <th className="px-6 py-4 text-xs font-black text-slate-400 uppercase">
// //                     User
// //                   </th>
// //                   <th className="px-6 py-4 text-xs font-black text-slate-400 uppercase">
// //                     Time Slot
// //                   </th>
// //                   <th className="px-6 py-4 text-xs font-black text-slate-400 uppercase text-center">
// //                     Status
// //                   </th>
// //                   <th className="px-6 py-4 text-xs font-black text-slate-400 uppercase">
// //                     Cancel Info
// //                   </th>
// //                   <th className="px-6 py-4 text-xs font-black text-slate-400 uppercase">
// //                     Actions
// //                   </th>
// //                 </tr>
// //               </thead>

// //               <tbody className="divide-y divide-slate-100">
// //                 {bookings.map((b) => (
// //                   <tr key={b.id} className="hover:bg-slate-50/40">
                    
// //                     {/* RESOURCE */}
// //                     <td className="px-6 py-5 font-bold text-slate-800">
// //                       {b.resourceName}
// //                     </td>

// //                     {/* USER */}
// //                     <td className="px-6 py-5 text-slate-600">
// //                       {b.userName}
// //                     </td>

// //                     {/* TIME */}
// //                     <td className="px-6 py-5 text-sm text-slate-500">
// //                       <div>
// //                         {new Date(b.startTime).toLocaleString()}
// //                       </div>
// //                       <div className="text-xs text-slate-400">
// //                         → {new Date(b.endTime).toLocaleString()}
// //                       </div>
// //                     </td>

// //                     {/* STATUS */}
// //                     <td className="px-6 py-5 text-center">
// //                       <span
// //                         className={`inline-block px-3 py-1 rounded-full text-[10px] font-black border ${getStatusStyle(
// //                           b.status
// //                         )}`}
// //                       >
// //                         {b.status}
// //                         {b.autoCancelled && " (auto)"}
// //                       </span>
// //                     </td>

// //                     {/* CANCEL TIME */}
// //                     <td className="px-6 py-5 text-sm text-slate-500">
// //                       {renderCancelledTime(b)}
// //                     </td>

// //                     {/* ACTIONS */}
// //                     <td className="px-6 py-5 space-x-2">
// //                       {b.status === "PENDING" && (
// //                         <>
// //                           <button
// //                             onClick={() =>
// //                               handleStatusChange(b.id, "approve")
// //                             }
// //                             className="inline-flex items-center gap-1 px-3 py-2 text-emerald-600 border border-emerald-200 rounded-lg hover:bg-emerald-50 text-xs font-semibold"
// //                           >
// //                             <CheckCircle className="w-4 h-4" />
// //                             Approve
// //                           </button>

// //                           <button
// //                             onClick={() =>
// //                               handleStatusChange(b.id, "reject")
// //                             }
// //                             className="inline-flex items-center gap-1 px-3 py-2 text-rose-600 border border-rose-200 rounded-lg hover:bg-rose-50 text-xs font-semibold"
// //                           >
// //                             <XCircle className="w-4 h-4" />
// //                             Reject
// //                           </button>

// //                           <button
// //                             onClick={() =>
// //                               handleStatusChange(b.id, "cancel")
// //                             }
// //                             className="inline-flex items-center gap-1 px-3 py-2 text-amber-600 border border-amber-200 rounded-lg hover:bg-amber-50 text-xs font-semibold"
// //                           >
// //                             <Ban className="w-4 h-4" />
// //                             Cancel
// //                           </button>
// //                         </>
// //                       )}

// //                       {b.status === "APPROVED" && (
// //                         <button
// //                           onClick={() =>
// //                             handleStatusChange(b.id, "cancel")
// //                           }
// //                           className="inline-flex items-center gap-1 px-3 py-2 text-amber-600 border border-amber-200 rounded-lg hover:bg-amber-50 text-xs font-semibold"
// //                         >
// //                           <Ban className="w-4 h-4" />
// //                           Cancel
// //                         </button>
// //                       )}
// //                     </td>
// //                   </tr>
// //                 ))}
// //               </tbody>
// //             </table>
// //           )}
// //         </div>
// //       </div>
// //     </div>
// //   );
// // }

// import { useState, useEffect } from "react";
// import { bookingsApi } from "../../api/bookings";
// import { formatDistanceToNowStrict } from "date-fns";
// import {
//   Calendar,
//   Clock,
//   CheckCircle,
//   XCircle,
//   Ban,
//   Loader2,
// } from "lucide-react";

// export default function AdminBookings() {
//   const [bookings, setBookings] = useState([]);
//   const [loading, setLoading] = useState(true);
//   const [selectedBooking, setSelectedBooking] = useState(null);

//   // Fetch bookings
//   const fetchBookings = async () => {
//     try {
//       const res = await bookingsApi.getAll();
//       const updated = res.data.data.map((b) => {
//         const now = new Date();
//         if (new Date(b.endTime) < now && b.status === "PENDING") {
//           b.status = "CANCELLED";
//           b.autoCancelled = true;
//         }
//         return b;
//       });
//       setBookings(updated);
//     } catch (err) {
//       console.error(err);
//     } finally {
//       setLoading(false);
//     }
//   };

//   useEffect(() => {
//     fetchBookings();
//     const interval = setInterval(fetchBookings, 60000);
//     return () => clearInterval(interval);
//   }, []);

//   // Actions
//   const handleStatusChange = async (id, action) => {
//     try {
//       let res;
//       if (action === "approve") res = await bookingsApi.approve(id);
//       if (action === "reject") res = await bookingsApi.reject(id);
//       if (action === "cancel") res = await bookingsApi.cancel(id);

//       setBookings((prev) =>
//         prev.map((b) => (b.id === id ? res.data.data : b))
//       );

//       // update selected panel
//       setSelectedBooking(res.data.data);
//     } catch {
//       alert("Failed to update status");
//     }
//   };

//   const getStatusStyle = (status) => {
//     const map = {
//       APPROVED: "bg-emerald-50 text-emerald-700 border-emerald-200",
//       PENDING: "bg-amber-50 text-amber-700 border-amber-200",
//       REJECTED: "bg-rose-50 text-rose-700 border-rose-200",
//       CANCELLED: "bg-slate-100 text-slate-600 border-slate-200",
//     };
//     return map[status] || "bg-blue-50 text-blue-700 border-blue-200";
//   };

//   const renderCancelledTime = (b) => {
//     if (b.status !== "CANCELLED") return "-";
//     const cancelTime = b.updatedAt
//       ? new Date(b.updatedAt)
//       : new Date();
//     return formatDistanceToNowStrict(cancelTime, { addSuffix: true });
//   };

//   if (loading)
//     return (
//       <div className="flex items-center justify-center h-60">
//         <Loader2 className="w-8 h-8 animate-spin text-indigo-600" />
//       </div>
//     );

//   return (
//     <div className="max-w-7xl mx-auto space-y-8 pb-20">
      
//       {/* HEADER */}
//       <div className="flex items-center gap-3">
//         <div className="p-3 bg-indigo-600 rounded-2xl shadow-lg shadow-indigo-100">
//           <Calendar className="text-white w-6 h-6" />
//         </div>
//         <div>
//           <h1 className="text-3xl font-black text-slate-800">
//             Booking Management
//           </h1>
//           <p className="text-slate-500">
//             Monitor and control all reservations
//           </p>
//         </div>
//       </div>

//       {/* TABLE */}
//       <div className="bg-white rounded-3xl border border-slate-200 shadow-sm overflow-hidden">
//         <div className="p-6 border-b">
//           <h3 className="text-lg font-bold flex items-center gap-2">
//             <Clock className="w-5 h-5 text-indigo-600" />
//             All Bookings
//           </h3>
//         </div>

//         <div className="overflow-x-auto">
//           {bookings.length === 0 ? (
//             <div className="p-16 text-center text-slate-500">
//               No bookings found
//             </div>
//           ) : (
//             <table className="w-full text-left">
//               <thead>
//                 <tr className="bg-slate-50">
//                   <th className="px-6 py-4 text-xs font-bold text-slate-400 uppercase">Resource</th>
//                   <th className="px-6 py-4 text-xs font-bold text-slate-400 uppercase">User</th>
//                   <th className="px-6 py-4 text-xs font-bold text-slate-400 uppercase">Time</th>
//                   <th className="px-6 py-4 text-xs font-bold text-slate-400 uppercase text-center">Status</th>
//                   <th className="px-6 py-4 text-xs font-bold text-slate-400 uppercase">Actions</th>
//                 </tr>
//               </thead>

//               <tbody className="divide-y">
//                 {bookings.map((b) => (
//                   <tr
//                     key={b.id}
//                     onClick={() => setSelectedBooking(b)}
//                     className="hover:bg-slate-50 cursor-pointer"
//                   >
//                     <td className="px-6 py-5 font-bold">{b.resourceName}</td>

//                     <td className="px-6 py-5">{b.userName}</td>

//                     <td className="px-6 py-5 text-sm text-slate-500">
//                       {new Date(b.startTime).toLocaleString()}
//                       <div className="text-xs text-slate-400">
//                         → {new Date(b.endTime).toLocaleString()}
//                       </div>
//                     </td>

//                     <td className="px-6 py-5 text-center">
//                       <span className={`px-3 py-1 rounded-full text-xs border ${getStatusStyle(b.status)}`}>
//                         {b.status}
//                       </span>
//                     </td>

//                     <td className="px-6 py-5 space-x-2">
//                       {b.status === "PENDING" && (
//                         <>
//                           <button
//                             onClick={(e) => {
//                               e.stopPropagation();
//                               handleStatusChange(b.id, "approve");
//                             }}
//                             className="text-emerald-600 text-xs font-semibold"
//                           >
//                             Approve
//                           </button>
//                           <button
//                             onClick={(e) => {
//                               e.stopPropagation();
//                               handleStatusChange(b.id, "reject");
//                             }}
//                             className="text-rose-600 text-xs font-semibold"
//                           >
//                             Reject
//                           </button>
//                         </>
//                       )}
//                     </td>
//                   </tr>
//                 ))}
//               </tbody>
//             </table>
//           )}
//         </div>
//       </div>

//       {/* RIGHT PANEL */}
//       {selectedBooking && (
//         <div className="fixed top-0 right-0 w-full sm:w-[400px] h-full bg-white shadow-2xl border-l z-50 overflow-y-auto">

//           {/* HEADER */}
//           <div className="p-6 border-b flex justify-between">
//             <h2 className="font-bold text-lg">Booking Details</h2>
//             <button onClick={() => setSelectedBooking(null)}>✕</button>
//           </div>

//           {/* CONTENT */}
//           <div className="p-6 space-y-4">

//             <div>
//               <p className="text-xs text-slate-400">Resource</p>
//               <p className="font-bold">{selectedBooking.resourceName}</p>
//             </div>

//             <div>
//               <p className="text-xs text-slate-400">User</p>
//               <p>{selectedBooking.userName}</p>
//             </div>

//             <div>
//               <p className="text-xs text-slate-400">Time</p>
//               <p>{new Date(selectedBooking.startTime).toLocaleString()}</p>
//               <p className="text-sm text-slate-400">
//                 → {new Date(selectedBooking.endTime).toLocaleString()}
//               </p>
//             </div>

//             <div>
//               <p className="text-xs text-slate-400">Purpose</p>
//               <p className="bg-slate-50 p-3 rounded-lg">
//                 {selectedBooking.purpose || "No purpose provided"}
//               </p>
//             </div>

//             <div>
//               <p className="text-xs text-slate-400">Status</p>
//               <span className={`px-3 py-1 rounded-full text-xs border ${getStatusStyle(selectedBooking.status)}`}>
//                 {selectedBooking.status}
//               </span>
//             </div>

//             <div>
//               <p className="text-xs text-slate-400">Created</p>
//               <p>{new Date(selectedBooking.createdAt).toLocaleString()}</p>
//             </div>

//             {/* ACTIONS */}
//             <div className="pt-4 space-y-2">
//               {selectedBooking.status === "PENDING" && (
//                 <>
//                   <button
//                     onClick={() => handleStatusChange(selectedBooking.id, "approve")}
//                     className="w-full bg-green-600 text-white py-2 rounded"
//                   >
//                     Approve
//                   </button>

//                   <button
//                     onClick={() => handleStatusChange(selectedBooking.id, "reject")}
//                     className="w-full bg-red-600 text-white py-2 rounded"
//                   >
//                     Reject
//                   </button>

//                   <button
//                     onClick={() => handleStatusChange(selectedBooking.id, "cancel")}
//                     className="w-full bg-orange-500 text-white py-2 rounded"
//                   >
//                     Cancel
//                   </button>
//                 </>
//               )}
//             </div>
//           </div>
//         </div>
//       )}
//     </div>
//   );
// }

import { useState, useEffect } from "react";
import { bookingsApi } from "../../api/bookings";
import { formatDistanceToNowStrict } from "date-fns";
import {
  Calendar,
  Clock,
  CheckCircle,
  XCircle,
  Ban,
  Loader2,
} from "lucide-react";

export default function AdminBookings() {
  const [bookings, setBookings] = useState([]);
  const [loading, setLoading] = useState(true);
  const [selectedBooking, setSelectedBooking] = useState(null);

  // Fetch bookings
  const fetchBookings = async () => {
    try {
      const res = await bookingsApi.getAll();
      const updated = res.data.data.map((b) => {
        const now = new Date();
        if (new Date(b.endTime) < now && b.status === "PENDING") {
          b.status = "CANCELLED";
          b.autoCancelled = true;
        }
        return b;
      });
      setBookings(updated);
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchBookings();
    const interval = setInterval(fetchBookings, 60000);
    return () => clearInterval(interval);
  }, []);

  // Handle booking actions
  const handleStatusChange = async (id, action) => {
    try {
      let res;
      if (action === "approve") res = await bookingsApi.approve(id);
      if (action === "reject") res = await bookingsApi.reject(id);
      if (action === "cancel") res = await bookingsApi.cancel(id);

      setBookings((prev) =>
        prev.map((b) => (b.id === id ? res.data.data : b))
      );

      // Update panel if open
      setSelectedBooking(res.data.data);
    } catch {
      alert("Failed to update status");
    }
  };

  // Status style mapping
  const getStatusStyle = (status) => {
    const map = {
      APPROVED: "bg-emerald-50 text-emerald-700 border-emerald-200",
      PENDING: "bg-amber-50 text-amber-700 border-amber-200",
      REJECTED: "bg-rose-50 text-rose-700 border-rose-200",
      CANCELLED: "bg-slate-100 text-slate-600 border-slate-200",
    };
    return map[status] || "bg-blue-50 text-blue-700 border-blue-200";
  };

  const renderCancelledTime = (b) => {
    if (b.status !== "CANCELLED") return "-";
    const cancelTime = b.updatedAt
      ? new Date(b.updatedAt)
      : new Date();
    return formatDistanceToNowStrict(cancelTime, { addSuffix: true });
  };

  if (loading)
    return (
      <div className="flex items-center justify-center h-60">
        <Loader2 className="w-8 h-8 animate-spin text-indigo-600" />
      </div>
    );

  return (
    <div className="max-w-7xl mx-auto space-y-8 pb-20">
      
      {/* HEADER */}
      <div className="flex items-center gap-3">
        <div className="p-3 bg-blue-600 rounded-2xl shadow-lg shadow-blue-100">
          <Calendar className="text-white w-6 h-6" />
        </div>
        <div>
          <h1 className="text-3xl font-black text-slate-800">
            Booking Management
          </h1>
          <p className="text-slate-500">
            Monitor and control all reservations
          </p>
        </div>
      </div>

      {/* BOOKINGS TABLE */}
      <div className="bg-white rounded-3xl border border-slate-200 shadow-sm overflow-hidden">
        <div className="p-6 border-b">
          <h3 className="text-lg font-bold flex items-center gap-2">
            <Clock className="w-5 h-5 text-blue-600" />
            All Bookings
          </h3>
        </div>

        <div className="overflow-x-auto">
          {bookings.length === 0 ? (
            <div className="p-16 text-center text-slate-500">
              No bookings found
            </div>
          ) : (
            <table className="w-full text-left">
              <thead>
                <tr className="bg-slate-50">
                  <th className="px-6 py-4 text-xs font-bold text-slate-400 uppercase">Resource</th>
                  <th className="px-6 py-4 text-xs font-bold text-slate-400 uppercase">User</th>
                  <th className="px-6 py-4 text-xs font-bold text-slate-400 uppercase">Time</th>
                  <th className="px-6 py-4 text-xs font-bold text-slate-400 uppercase text-center">Status</th>
                  <th className="px-6 py-4 text-xs font-bold text-slate-400 uppercase">Actions</th>
                </tr>
              </thead>

              <tbody className="divide-y">
                {bookings.map((b) => (
                  <tr
                    key={b.id}
                    onClick={() => setSelectedBooking(b)}
                    className="hover:bg-slate-50 cursor-pointer"
                  >
                    <td className="px-6 py-5 font-bold">{b.resourceName}</td>
                    <td className="px-6 py-5">{b.userName}</td>
                    <td className="px-6 py-5 text-sm text-slate-500">
                      {new Date(b.startTime).toLocaleString()}
                      <div className="text-xs text-slate-400">
                        → {new Date(b.endTime).toLocaleString()}
                      </div>
                    </td>
                    <td className="px-6 py-5 text-center">
                      <span className={`px-3 py-1 rounded-full text-xs border ${getStatusStyle(b.status)}`}>
                        {b.status} {b.autoCancelled && "(auto)"}
                      </span>
                    </td>
                    <td className="px-6 py-5 space-x-2">
                      {b.status === "PENDING" && (
                        <>
                          <button
                            onClick={(e) => { e.stopPropagation(); handleStatusChange(b.id, "approve"); }}
                            className="text-blue-600 text-xs font-semibold"
                          >
                            Approve
                          </button>
                          <button
                            onClick={(e) => { e.stopPropagation(); handleStatusChange(b.id, "reject"); }}
                            className="text-rose-600 text-xs font-semibold"
                          >
                            Reject
                          </button>
                          <button
                            onClick={(e) => { e.stopPropagation(); handleStatusChange(b.id, "cancel"); }}
                            className="text-orange-600 text-xs font-semibold"
                          >
                            Cancel
                          </button>
                        </>
                      )}

                      {b.status === "APPROVED" && (
                        <button
                          onClick={(e) => { e.stopPropagation(); handleStatusChange(b.id, "cancel"); }}
                          className="text-orange-600 text-xs font-semibold"
                        >
                          Cancel
                        </button>
                      )}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          )}
        </div>
      </div>

      {/* RIGHT PANEL */}
      {selectedBooking && (
        <div className="fixed top-0 right-0 w-full sm:w-[400px] h-full bg-white shadow-2xl border-l z-50 overflow-y-auto">
          
          {/* HEADER */}
          <div className="p-6 border-b flex justify-between items-center">
            <h2 className="font-bold text-lg">Booking Details</h2>
            <button onClick={() => setSelectedBooking(null)}>✕</button>
          </div>

          {/* CONTENT */}
          <div className="p-6 space-y-4">

            <div>
              <p className="text-xs text-slate-400">Resource</p>
              <p className="font-bold">{selectedBooking.resourceName}</p>
            </div>

            <div>
              <p className="text-xs text-slate-400">User</p>
              <p>{selectedBooking.userName}</p>
            </div>

            <div>
              <p className="text-xs text-slate-400">Time</p>
              <p>{new Date(selectedBooking.startTime).toLocaleString()}</p>
              <p className="text-sm text-slate-400">
                → {new Date(selectedBooking.endTime).toLocaleString()}
              </p>
            </div>

            <div>
              <p className="text-xs text-slate-400">Purpose</p>
              <p className="bg-slate-50 p-3 rounded-lg">
                {selectedBooking.purpose || "No purpose provided"}
              </p>
            </div>

            <div>
              <p className="text-xs text-slate-400">Status</p>
              <span className={`px-3 py-1 rounded-full text-xs border ${getStatusStyle(selectedBooking.status)}`}>
                {selectedBooking.status} {selectedBooking.autoCancelled && "(auto)"}
              </span>
            </div>

            <div>
              <p className="text-xs text-slate-400">Created</p>
              <p>{new Date(selectedBooking.createdAt).toLocaleString()}</p>
            </div>

            {/* ACTIONS */}
            <div className="pt-4 space-y-2">
              {selectedBooking.status === "PENDING" && (
                <>
                  <button
                    onClick={() => handleStatusChange(selectedBooking.id, "approve")}
                    className="w-full bg-blue-600 text-white py-2 rounded"
                  >
                    Approve
                  </button>

                  <button
                    onClick={() => handleStatusChange(selectedBooking.id, "reject")}
                    className="w-full bg-red-600 text-white py-2 rounded"
                  >
                    Reject
                  </button>

                  <button
                    onClick={() => handleStatusChange(selectedBooking.id, "cancel")}
                    className="w-full bg-orange-500 text-white py-2 rounded"
                  >
                    Cancel
                  </button>
                </>
              )}

              {selectedBooking.status === "APPROVED" && (
                <button
                  onClick={() => handleStatusChange(selectedBooking.id, "cancel")}
                  className="w-full bg-orange-500 text-white py-2 rounded"
                >
                  Cancel
                </button>
              )}
            </div>
          </div>
        </div>
      )}
    </div>
  );
}