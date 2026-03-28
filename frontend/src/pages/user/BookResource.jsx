// // // // import { useState } from 'react';
// // // // import { useParams, useNavigate } from 'react-router-dom';
// // // // import axios from 'axios';

// // // // export default function BookResource() {
// // // //   const { id } = useParams();
// // // //   const navigate = useNavigate();

// // // //   const [form, setForm] = useState({
// // // //     startTime: '',
// // // //     endTime: '',
// // // //     purpose: ''
// // // //   });

// // // //   const handleChange = e =>
// // // //     setForm({ ...form, [e.target.name]: e.target.value });

// // // //   const handleSubmit = async e => {
// // // //     e.preventDefault();

// // // //     try {
// // // //       await axios.post('/api/bookings', {
// // // //         resourceId: id,
// // // //         ...form
// // // //       });

// // // //       alert("Booking Successful ✅");
// // // //       navigate('/user/bookings');

// // // //     } catch (err) {
// // // //       alert("Error: " + err.response?.data?.message);
// // // //     }
// // // //   };

// // // //   return (
// // // //     <div className="p-6 max-w-md mx-auto bg-white shadow rounded">
// // // //       <h1 className="text-xl font-bold mb-4">Book Resource</h1>

// // // //       <form onSubmit={handleSubmit} className="flex flex-col gap-3">

// // // //         <input
// // // //           type="datetime-local"
// // // //           name="startTime"
// // // //           onChange={handleChange}
// // // //           required
// // // //           className="border p-2 rounded"
// // // //         />

// // // //         <input
// // // //           type="datetime-local"
// // // //           name="endTime"
// // // //           onChange={handleChange}
// // // //           required
// // // //           className="border p-2 rounded"
// // // //         />

// // // //         <input
// // // //           type="text"
// // // //           name="purpose"
// // // //           placeholder="Purpose"
// // // //           onChange={handleChange}
// // // //           className="border p-2 rounded"
// // // //         />

// // // //         <button className="bg-green-500 text-white p-2 rounded">
// // // //           Confirm Booking
// // // //         </button>

// // // //       </form>
// // // //     </div>
// // // //   );
// // // // }

// // // import { useState } from 'react';
// // // import { useParams, useNavigate } from 'react-router-dom';
// // // import axios from 'axios';
// // // import { Calendar, Clock, BookOpen, CheckCircle } from 'lucide-react'; // Optional: npm install lucide-react

// // // export default function BookResource() {
// // //   const { id } = useParams();
// // //   const navigate = useNavigate();
// // //   const [loading, setLoading] = useState(false);

// // //   const [form, setForm] = useState({
// // //     startTime: '',
// // //     endTime: '',
// // //     purpose: ''
// // //   });

// // //   const handleChange = e =>
// // //     setForm({ ...form, [e.target.name]: e.target.value });

// // //   const handleSubmit = async e => {
// // //     e.preventDefault();
// // //     setLoading(true);

// // //     try {
// // //       await axios.post('/api/bookings', {
// // //         resourceId: id,
// // //         ...form
// // //       });
// // //       alert("Booking Successful ✅");
// // //       navigate('/user/bookings');
// // //     } catch (err) {
// // //       alert("Error: " + (err.response?.data?.message || "Something went wrong"));
// // //     } finally {
// // //       setLoading(false);
// // //     }
// // //   };

// // //   return (
// // //     <div className="min-h-screen bg-gray-50 py-12 px-4">
// // //       <div className="max-w-md mx-auto bg-white rounded-2xl shadow-xl overflow-hidden border border-gray-100">
        
// // //         {/* Header Section */}
// // //         <div className="bg-indigo-600 p-6 text-white">
// // //           <div className="flex items-center gap-3">
// // //             <Calendar className="w-8 h-8" />
// // //             <div>
// // //               <h1 className="text-2xl font-bold">Reserve Resource</h1>
// // //               <p className="text-indigo-100 text-sm">Fill in the details to secure your slot</p>
// // //             </div>
// // //           </div>
// // //         </div>

// // //         {/* Form Section */}
// // //         <form onSubmit={handleSubmit} className="p-8 space-y-6">
          
// // //           {/* Start Time */}
// // //           <div>
// // //             <label className="flex items-center gap-2 text-sm font-semibold text-gray-700 mb-2">
// // //               <Clock className="w-4 h-4 text-indigo-500" />
// // //               Start Date & Time
// // //             </label>
// // //             <input
// // //               type="datetime-local"
// // //               name="startTime"
// // //               onChange={handleChange}
// // //               required
// // //               className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:ring-2 focus:ring-indigo-500 focus:border-transparent outline-none transition-all bg-gray-50"
// // //             />
// // //           </div>

// // //           {/* End Time */}
// // //           <div>
// // //             <label className="flex items-center gap-2 text-sm font-semibold text-gray-700 mb-2">
// // //               <Clock className="w-4 h-4 text-rose-500" />
// // //               End Date & Time
// // //             </label>
// // //             <input
// // //               type="datetime-local"
// // //               name="endTime"
// // //               onChange={handleChange}
// // //               required
// // //               className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:ring-2 focus:ring-indigo-500 focus:border-transparent outline-none transition-all bg-gray-50"
// // //             />
// // //           </div>

// // //           {/* Purpose */}
// // //           <div>
// // //             <label className="flex items-center gap-2 text-sm font-semibold text-gray-700 mb-2">
// // //               <BookOpen className="w-4 h-4 text-indigo-500" />
// // //               Purpose of Use
// // //             </label>
// // //             <textarea
// // //               name="purpose"
// // //               placeholder="e.g. Project Meeting, Individual Study..."
// // //               rows="3"
// // //               onChange={handleChange}
// // //               className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:ring-2 focus:ring-indigo-500 focus:border-transparent outline-none transition-all bg-gray-50 resize-none"
// // //             />
// // //           </div>

// // //           {/* Submit Button */}
// // //           <button
// // //             type="submit"
// // //             disabled={loading}
// // //             className={`w-full flex items-center justify-center gap-2 py-4 rounded-xl text-white font-bold text-lg transition-all shadow-lg active:scale-[0.98] ${
// // //               loading 
// // //                 ? 'bg-gray-400 cursor-not-allowed' 
// // //                 : 'bg-indigo-600 hover:bg-indigo-700 hover:shadow-indigo-200'
// // //             }`}
// // //           >
// // //             {loading ? (
// // //               "Processing..."
// // //             ) : (
// // //               <>
// // //                 <CheckCircle className="w-5 h-5" />
// // //                 Confirm Booking
// // //               </>
// // //             )}
// // //           </button>

// // //           <p className="text-center text-xs text-gray-400">
// // //             By clicking confirm, you agree to our resource usage policy.
// // //           </p>
// // //         </form>
// // //       </div>
// // //     </div>
// // //   );
// // // }

// // // frontend/src/pages/user/BookResource.jsx
// // import { useState } from 'react';
// // import { useParams, useNavigate } from 'react-router-dom';
// // import axios from 'axios';

// // export default function BookResource() {
// //   const { id } = useParams(); // resource ID from URL
// //   const navigate = useNavigate();
// //   const [loading, setLoading] = useState(false);

// //   const [form, setForm] = useState({
// //     startTime: '',
// //     endTime: '',
// //     purpose: ''
// //   });

// //   const handleChange = e => {
// //     setForm({ ...form, [e.target.name]: e.target.value });
// //   };

// //   const handleSubmit = async e => {
// //     e.preventDefault();

// //     if (!form.startTime || !form.endTime || !form.purpose) {
// //       alert("Please fill all fields");
// //       return;
// //     }

// //     if (new Date(form.endTime) <= new Date(form.startTime)) {
// //       alert("End time must be after start time");
// //       return;
// //     }

// //     setLoading(true);

// //     try {
// //       // Make POST request to backend
// //       await axios.post(`http://localhost:8083/api/bookings`, {
// //         resourceId: id,
// //         ...form
// //       });

// //       alert("Booking Successful ✅");
// //       navigate('/user/bookings');
// //     } catch (err) {
// //       console.error(err);
// //       alert("Error: " + (err.response?.data?.message || "Something went wrong"));
// //     } finally {
// //       setLoading(false);
// //     }
// //   };

// //   return (
// //     <div style={{ padding: '2rem' }}>
// //       <h1>Reserve Resource</h1>
// //       <form onSubmit={handleSubmit} style={{ maxWidth: '400px' }}>
// //         <div style={{ marginBottom: '1rem' }}>
// //           <label>Start Date & Time</label>
// //           <input
// //             type="datetime-local"
// //             name="startTime"
// //             value={form.startTime}
// //             onChange={handleChange}
// //             required
// //             style={{ width: '100%', padding: '0.5rem' }}
// //           />
// //         </div>

// //         <div style={{ marginBottom: '1rem' }}>
// //           <label>End Date & Time</label>
// //           <input
// //             type="datetime-local"
// //             name="endTime"
// //             value={form.endTime}
// //             onChange={handleChange}
// //             required
// //             style={{ width: '100%', padding: '0.5rem' }}
// //           />
// //         </div>

// //         <div style={{ marginBottom: '1rem' }}>
// //           <label>Purpose</label>
// //           <textarea
// //             name="purpose"
// //             value={form.purpose}
// //             onChange={handleChange}
// //             rows="3"
// //             placeholder="e.g. Project Meeting, Study"
// //             style={{ width: '100%', padding: '0.5rem' }}
// //           />
// //         </div>

// //         <button type="submit" disabled={loading} style={{ padding: '0.5rem 1rem' }}>
// //           {loading ? "Processing..." : "Confirm Booking"}
// //         </button>
// //       </form>
// //     </div>
// //   );
// // }

// import { useState, useEffect } from 'react';
// import { useParams, useNavigate } from 'react-router-dom';
// import axios from 'axios';
// import DatePicker from 'react-datepicker';
// import "react-datepicker/dist/react-datepicker.css";

// export default function BookResource() {
//   const { id } = useParams();
//   const navigate = useNavigate();

//   const [loading, setLoading] = useState(false);
//   const [bookings, setBookings] = useState([]);

//   const [startTime, setStartTime] = useState(null);
//   const [endTime, setEndTime] = useState(null);
//   const [purpose, setPurpose] = useState('');

//   // ✅ Load bookings
//   useEffect(() => {
//     axios
//       .get(`http://localhost:8083/api/bookings/resource/${id}`)
//       .then(res => setBookings(res.data.data))
//       .catch(err => console.error(err));
//   }, [id]);

//   // ✅ Convert booked times to disabled intervals
//   const excludeIntervals = bookings.map(b => ({
//     start: new Date(b.startTime),
//     end: new Date(b.endTime)
//   }));

//   // ✅ Check conflict
//   const isConflict = (start, end) => {
//     return excludeIntervals.some(interval =>
//       start < interval.end && end > interval.start
//     );
//   };

//   const handleSubmit = async (e) => {
//     e.preventDefault();

//     if (!startTime || !endTime || !purpose) {
//       alert("Fill all fields");
//       return;
//     }

//     if (endTime <= startTime) {
//       alert("End time must be after start");
//       return;
//     }

//     if (isConflict(startTime, endTime)) {
//       alert("❌ This time is already booked!");
//       return;
//     }

//     try {
//       setLoading(true);

//       const token = localStorage.getItem("token");

//       await axios.post(
//         "http://localhost:8083/api/bookings",
//         {
//           resourceId: Number(id),
//           startTime: startTime.toISOString().slice(0, 19),
//           endTime: endTime.toISOString().slice(0, 19),
//           purpose
//         },
//         {
//           headers: {
//             Authorization: `Bearer ${token}`
//           }
//         }
//       );

//       alert("✅ Booking Successful!");
//       navigate("/user/bookings");

//     } catch (err) {
//       alert("❌ " + (err.response?.data?.message || "Error"));
//     } finally {
//       setLoading(false);
//     }
//   };

//   return (
//     <div style={{ padding: "2rem" }}>
//       <h2>📅 Book Resource</h2>

//       {/* ✅ Show booked slots */}
//       <div style={{ background: "#eee", padding: "10px", marginBottom: "20px" }}>
//         <h4>🚫 Booked Time Slots</h4>
//         {bookings.length === 0 ? (
//           <p>No bookings</p>
//         ) : (
//           bookings.map((b, i) => (
//             <p key={i}>
//               {new Date(b.startTime).toLocaleString()} →{" "}
//               {new Date(b.endTime).toLocaleString()}
//             </p>
//           ))
//         )}
//       </div>

//       <form onSubmit={handleSubmit}>

//         <div style={{ marginBottom: "1rem" }}>
//           <label>Start Time</label>
//           <DatePicker
//             selected={startTime}
//             onChange={(date) => setStartTime(date)}
//             showTimeSelect
//             timeIntervals={30}
//             dateFormat="yyyy-MM-dd HH:mm"
//             minDate={new Date()}
//             excludeDateIntervals={excludeIntervals} // 🔥 BLOCK
//             placeholderText="Select start time"
//           />
//         </div>

//         <div style={{ marginBottom: "1rem" }}>
//           <label>End Time</label>
//           <DatePicker
//             selected={endTime}
//             onChange={(date) => setEndTime(date)}
//             showTimeSelect
//             timeIntervals={30}
//             dateFormat="yyyy-MM-dd HH:mm"
//             minDate={startTime || new Date()}
//             excludeDateIntervals={excludeIntervals} // 🔥 BLOCK
//             placeholderText="Select end time"
//           />
//         </div>

//         <div style={{ marginBottom: "1rem" }}>
//           <label>Purpose</label>
//           <textarea
//             value={purpose}
//             onChange={(e) => setPurpose(e.target.value)}
//             rows="3"
//           />
//         </div>

//         <button disabled={loading}>
//           {loading ? "Booking..." : "Confirm Booking"}
//         </button>

//       </form>
//     </div>
//   );
// }

import { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import axios from 'axios';
import DatePicker from 'react-datepicker';
import "react-datepicker/dist/react-datepicker.css";

export default function BookResource() {
  const { id } = useParams();
  const navigate = useNavigate();

  const [loading, setLoading] = useState(false);
  const [bookings, setBookings] = useState([]);

  const [startTime, setStartTime] = useState(null);
  const [endTime, setEndTime] = useState(null);
  const [purpose, setPurpose] = useState('');

  // ✅ Load bookings
  useEffect(() => {
    axios
      .get(`http://localhost:8083/api/bookings/resource/${id}`)
      .then(res => setBookings(res.data.data))
      .catch(err => console.error(err));
  }, [id]);

  // ✅ Convert bookings
  const intervals = bookings.map(b => ({
    start: new Date(b.startTime),
    end: new Date(b.endTime)
  }));

  // ✅ Get all booked TIMES (disable hours)
  const getDisabledTimes = (date) => {
    let disabled = [];

    intervals.forEach(interval => {
      if (
        date &&
        interval.start.toDateString() === date.toDateString()
      ) {
        let startHour = interval.start.getHours();
        let endHour = interval.end.getHours();

        for (let h = startHour; h <= endHour; h++) {
          disabled.push(h);
        }
      }
    });

    return disabled;
  };

  // ✅ Check conflict
  const isConflict = (start, end) => {
    return intervals.some(i =>
      start < i.end && end > i.start
    );
  };

  // ✅ Highlight booked days in calendar
  const highlightDates = intervals.map(i => i.start);

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!startTime || !endTime || !purpose) {
      alert("Fill all fields");
      return;
    }

    if (endTime <= startTime) {
      alert("End time must be after start");
      return;
    }

    if (isConflict(startTime, endTime)) {
      alert("❌ This time is already booked!");
      return;
    }

    try {
      setLoading(true);

      const token = localStorage.getItem("token");

      await axios.post(
        "http://localhost:8083/api/bookings",
        {
          resourceId: Number(id),
          startTime: startTime.toISOString().slice(0, 19),
          endTime: endTime.toISOString().slice(0, 19),
          purpose
        },
        {
          headers: {
            Authorization: `Bearer ${token}`
          }
        }
      );

      alert("✅ Booking Successful!");
      navigate("/user/bookings");

    } catch (err) {
      alert("❌ " + (err.response?.data?.message || "Error"));
    } finally {
      setLoading(false);
    }
  };

  return (
    <div style={{ padding: "2rem" }}>
      <h2>📅 Book Resource</h2>

      {/* ✅ SHOW BOOKED TIMES */}
      <div style={{
        background: "#ffe6e6",
        padding: "10px",
        marginBottom: "20px",
        border: "1px solid red"
      }}>
        <h4>🚫 Booked Time Slots</h4>
        {bookings.length === 0 ? (
          <p>No bookings</p>
        ) : (
          bookings.map((b, i) => (
            <p key={i}>
              🟥 {new Date(b.startTime).toLocaleString()} →{" "}
              {new Date(b.endTime).toLocaleString()}
            </p>
          ))
        )}
      </div>

      <form onSubmit={handleSubmit}>

        {/* ✅ START TIME */}
        <div style={{ marginBottom: "1rem" }}>
          <label>Start Time</label>
          <DatePicker
            selected={startTime}
            onChange={(date) => setStartTime(date)}
            showTimeSelect
            timeIntervals={30}
            dateFormat="yyyy-MM-dd HH:mm"
            minDate={new Date()}
            highlightDates={highlightDates} // 🔥 mark booked days
            filterTime={(time) => {
              const selectedDate = startTime || new Date();
              const hour = time.getHours();
              return !getDisabledTimes(selectedDate).includes(hour);
            }}
            placeholderText="Select start time"
          />
        </div>

        {/* ✅ END TIME */}
        <div style={{ marginBottom: "1rem" }}>
          <label>End Time</label>
          <DatePicker
            selected={endTime}
            onChange={(date) => setEndTime(date)}
            showTimeSelect
            timeIntervals={30}
            dateFormat="yyyy-MM-dd HH:mm"
            minDate={startTime || new Date()}
            highlightDates={highlightDates}
            filterTime={(time) => {
              const selectedDate = endTime || startTime || new Date();
              const hour = time.getHours();
              return !getDisabledTimes(selectedDate).includes(hour);
            }}
            placeholderText="Select end time"
          />
        </div>

        {/* PURPOSE */}
        <div style={{ marginBottom: "1rem" }}>
          <label>Purpose</label>
          <textarea
            value={purpose}
            onChange={(e) => setPurpose(e.target.value)}
            rows="3"
          />
        </div>

        <button disabled={loading}>
          {loading ? "Booking..." : "Confirm Booking"}
        </button>

      </form>
    </div>
  );
}