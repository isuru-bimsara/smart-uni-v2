// //frontend/src/pages/TicketComments.jsx
// import { useState, useEffect, useRef } from "react";
// import { ticketsApi } from "../api/tickets";
// import { Send, X, MessageSquare } from "lucide-react";

// export default function TicketComments({ ticketId, open, onClose }) {
//   const [comments, setComments] = useState([]);
//   const [message, setMessage] = useState("");
//   const [loading, setLoading] = useState(false);
//   const bottomRef = useRef();

//   useEffect(() => {
//     if (open && ticketId) {
//       setLoading(true);
//       ticketsApi.getComments(ticketId).then(res => {
//         setComments(res.data.data || []);
//         setLoading(false);
//       }).catch(() => setLoading(false));
//     }
//   }, [ticketId, open]);

//   useEffect(() => { bottomRef.current?.scrollIntoView({ behavior: "smooth" }); }, [comments, open]);

//   const sendComment = async (e) => {
//     e.preventDefault();
//     if (!message.trim()) return;
//     setLoading(true);
//     try {
//       await ticketsApi.addComment(ticketId, message);
//       setMessage("");
//       const res = await ticketsApi.getComments(ticketId);
//       setComments(res.data.data || []);
//     } finally {
//       setLoading(false);
//     }
//   };

//   if (!open) return null;
//   return (
//     <div className="fixed inset-0 z-50 bg-black/40 flex items-center justify-center">
//       <div className="bg-white w-full max-w-lg rounded-2xl shadow-lg relative flex flex-col max-h-[80vh]">
//         <button onClick={onClose} className="absolute right-3 top-3 text-gray-400 hover:text-red-600">
//           <X className="w-6 h-6" />
//         </button>
//         <div className="p-5 border-b flex gap-2 items-center">
//           <MessageSquare className="text-indigo-600 w-6 h-6" />
//           <div>
//             <div className="font-bold text-lg text-slate-800">Ticket Messages</div>
//             <div className="text-xs text-slate-400">Ticket #{ticketId}</div>
//           </div>
//         </div>
//         <div className="flex-1 overflow-y-auto p-4 space-y-4">
//           {loading ? (
//             <div className="text-center text-slate-400">Loading...</div>
//           ) : (
//             comments.length === 0 ? (
//               <div className="text-center text-slate-400 italic">No messages yet.</div>
//             ) : (
//               comments.map((c) => (
//                 <div key={c.id} className="bg-slate-50 border rounded-xl p-3">
//                   <div className="text-xs font-semibold text-slate-700">{c.userName}</div>
//                   <div className="text-slate-700">{c.content}</div>
//                   <div className="text-[10px] text-slate-400">{new Date(c.createdAt).toLocaleString()}</div>
//                 </div>
//               ))
//             )
//           )}
//           <div ref={bottomRef}></div>
//         </div>
//         <form onSubmit={sendComment} className="p-4 border-t flex gap-2">
//           <input
//             value={message}
//             onChange={e => setMessage(e.target.value)}
//             type="text"
//             placeholder="Type your message…"
//             className="flex-1 border bg-slate-50 rounded-full px-4 py-2"
//             disabled={loading}
//           />
//           <button
//             type="submit"
//             disabled={loading || !message.trim()}
//             className="bg-indigo-600 text-white px-4 py-2 rounded-full flex items-center gap-1"
//           >
//             <Send className="w-4 h-4" />
//             Send
//           </button>
//         </form>
//       </div>
//     </div>
//   );
// }

// frontend/src/pages/TicketComments.jsx
import { useState, useEffect, useRef } from "react";
import { ticketsApi } from "../api/tickets";
import { Send, X, MessageSquare } from "lucide-react";

export default function TicketComments({ ticketId, open, onClose, currentUserName }) {
  const [comments, setComments] = useState([]);
  const [message, setMessage] = useState("");
  const [loading, setLoading] = useState(false);
  const bottomRef = useRef();

  // "Technician" is the default if currentUserName isn't passed
  const currentUser = currentUserName || "Technician";

  useEffect(() => {
    if (open && ticketId) {
      loadComments();
    }
  }, [ticketId, open]);

  const loadComments = async () => {
    setLoading(true);
    try {
      const res = await ticketsApi.getComments(ticketId);
      setComments(res.data.data || []);
    } catch (err) {
      console.error("Failed to load messages");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [comments, open]);

  const sendComment = async (e) => {
    e.preventDefault();
    if (!message.trim()) return;
    try {
      await ticketsApi.addComment(ticketId, message);
      setMessage("");
      loadComments(); 
    } catch (err) {
      alert("Failed to send message");
    }
  };

  // Helper to get initials for Avatar
  const getInitials = (name) => name?.split(" ").map(n => n[0]).join("").toUpperCase().slice(0, 2);

  if (!open) return null;

  return (
    <div className="fixed inset-0 z-[100] bg-slate-900/60 backdrop-blur-sm flex items-center justify-center p-4">
      <div className="bg-[#f0f2f5] w-full max-w-xl rounded-3xl shadow-2xl relative flex flex-col h-[650px] overflow-hidden border border-slate-200">
        
        {/* HEADER */}
        <div className="p-4 bg-white border-b flex justify-between items-center z-10 shadow-sm">
          <div className="flex items-center gap-3">
            <div className="bg-blue-600 p-2.5 rounded-2xl shadow-lg shadow-blue-100">
              <MessageSquare className="text-white w-5 h-5" />
            </div>
            <div>
              <h3 className="font-bold text-slate-800 text-base leading-none">Support Chat</h3>
              <p className="text-[11px] font-bold text-blue-500 uppercase mt-1 tracking-wider">Ticket #{ticketId}</p>
            </div>
          </div>
          <button onClick={onClose} className="p-2 hover:bg-slate-100 rounded-full text-slate-400 transition-all">
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* CHAT AREA */}
        <div className="flex-1 overflow-y-auto p-4 md:p-6 space-y-4">
          {loading && comments.length === 0 ? (
            <div className="flex justify-center items-center h-full">
              <div className="animate-pulse text-slate-400 font-medium text-sm">Synchronizing messages...</div>
            </div>
          ) : (
            comments.map((c, index) => {
              const isMe = c.userName === currentUser;
              // Check if previous message was from same user to group them
              const isSameAsPrev = index > 0 && comments[index - 1].userName === c.userName;

              return (
                <div key={c.id} className={`flex w-full items-end gap-2 ${isMe ? "flex-row-reverse" : "flex-row"}`}>
                  
                  {/* AVATAR - Hide if same user sent consecutive messages */}
                  {!isMe ? (
                    <div className={`w-8 h-8 rounded-full flex items-center justify-center text-[10px] font-bold text-white shadow-sm transition-opacity ${isSameAsPrev ? "opacity-0" : "opacity-100"} bg-slate-400`}>
                      {getInitials(c.userName)}
                    </div>
                  ) : (
                    <div className={`w-8 h-8 rounded-full flex items-center justify-center text-[10px] font-bold text-white shadow-sm transition-opacity ${isSameAsPrev ? "opacity-0" : "opacity-100"} bg-blue-600`}>
                      ME
                    </div>
                  )}

                  <div className={`max-w-[75%] flex flex-col ${isMe ? "items-end" : "items-start"}`}>
                    {/* User Name - Only show if not me and not grouped */}
                    {!isMe && !isSameAsPrev && (
                      <span className="text-[10px] font-bold text-slate-500 ml-1 mb-1 uppercase tracking-tight">{c.userName}</span>
                    )}

                    {/* MESSAGE BUBBLE */}
                    <div className={`px-4 py-2.5 shadow-sm text-sm ${
                      isMe 
                      ? "bg-blue-600 text-white rounded-2xl rounded-br-none shadow-blue-100" 
                      : "bg-white text-slate-700 rounded-2xl rounded-bl-none border border-slate-200"
                    }`}>
                      {c.content}
                    </div>

                    {/* TIME */}
                    <div className="text-[9px] mt-1 text-slate-400 font-semibold px-1">
                      {new Date(c.createdAt).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                    </div>
                  </div>
                </div>
              );
            })
          )}
          <div ref={bottomRef}></div>
        </div>

        {/* INPUT AREA */}
        <div className="p-4 bg-white border-t border-slate-100">
          <form onSubmit={sendComment} className="flex gap-2 items-center bg-slate-100 p-1.5 rounded-[24px] focus-within:ring-2 ring-blue-500/20 transition-all">
            <input
              value={message}
              onChange={e => setMessage(e.target.value)}
              type="text"
              placeholder="Write a message..."
              className="flex-1 bg-transparent border-none px-4 py-2 text-sm outline-none text-slate-700 placeholder:text-slate-400"
              disabled={loading}
            />
            <button
              type="submit"
              disabled={loading || !message.trim()}
              className="bg-blue-600 hover:bg-blue-700 disabled:bg-slate-300 text-white p-2.5 rounded-full shadow-md shadow-blue-100 transition-all active:scale-90"
            >
              <Send className="w-4 h-4" />
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}