//frontend/src/pages/tech/TechTickets.jsx

import { useEffect, useState } from "react";
import { ticketsApi } from "../../api/tickets";
import TicketComments from "../TicketComments";
import { MessageSquare } from "lucide-react";

const TICKET_CATEGORIES = [
  "ALL",
  "ELECTRICAL",
  "PLUMBING",
  "HVAC",
  "IT",
  "CLEANING",
  "OTHER",
];

export default function TechTickets() {
  const [tickets, setTickets] = useState([]);
  const [filter, setFilter] = useState("ALL");
  const [commentOpen, setCommentOpen] = useState(false);
  const [commentTicket, setCommentTicket] = useState(null); // whole ticket object

  useEffect(() => {
    fetchTickets();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [filter]);

  const fetchTickets = async () => {
    try {
      let res;
      if (!filter || filter === "ALL") {
        res = await ticketsApi.getAll();
      } else {
        // Only pass valid Java Enum value, not "ALL"
        res = await ticketsApi.getAssignedByType(filter);
      }
      setTickets(res.data.data || []);
    } catch (err) {
      setTickets([]);
    }
  };

  async function handleStatusChange(ticketId, status) {
    try {
      await ticketsApi.updateStatus(ticketId, status);
      fetchTickets();
      if (commentOpen) (setCommentTicket(null), setCommentOpen(false));
    } catch (err) {
      alert(
        "Failed to update status: " +
          (err.response?.data?.message || err.message),
      );
    }
  }

  return (
    <div className="max-w-5xl mx-auto">
      <h1 className="text-2xl font-bold mb-6">Assigned Tickets</h1>
      {/* Technician Ticket Type Filter */}
      <div className="mb-6 flex gap-3 items-center">
        <label className="font-semibold">Please select your type:</label>
        <select
          value={filter}
          onChange={(e) => setFilter(e.target.value)}
          className="bg-white border rounded px-4 py-2"
        >
          {TICKET_CATEGORIES.map((cat) => (
            <option key={cat} value={cat}>
              {cat[0] + cat.slice(1).toLowerCase()}
            </option>
          ))}
        </select>
      </div>
      <table className="w-full border">
        <thead>
          <tr className="bg-gray-100">
            <th className="p-2">Title</th>
            <th className="p-2">User</th>
            <th className="p-2">Type</th>
            <th className="p-2">Status</th>
            <th className="p-2">Images</th>
            <th className="p-2">Change Status</th>
            <th className="p-2">Messages</th>
          </tr>
        </thead>
        <tbody>
          {tickets.map((t) => (
            <tr key={t.id} className="border-t">
              <td className="p-2">{t.title}</td>
              <td className="p-2">{t.reporterName}</td>
              <td className="p-2">{t.category}</td>
              <td className="p-2">{t.status}</td>
              <td className="p-2">
                {t.images && t.images.length > 0 ? (
                  <div className="flex -space-x-3 overflow-hidden">
                    {t.images.map((img, idx) => (
                      <img
                        key={idx}
                        src={img.startsWith("http") ? img : `/${img}`}
                        alt="Ticket"
                        style={{
                          width: "40px",
                          height: "40px",
                          objectFit: "cover",
                          borderRadius: "6px",
                        }}
                      />
                    ))}
                  </div>
                ) : (
                  <span className="text-xs text-gray-400">No image</span>
                )}
              </td>
              <td className="p-2">
                <select
                  value={t.status}
                  onChange={(e) => handleStatusChange(t.id, e.target.value)}
                  className="border rounded px-2 py-1"
                >
                  <option value="OPEN">Open</option>
                  <option value="IN_PROGRESS">In Progress</option>
                  <option value="RESOLVED">Resolved</option>
                  <option value="CLOSED">Closed</option>
                </select>
              </td>
              <td className="p-2">
                <button
                  onClick={() => {
                    setCommentTicket(t);
                    setCommentOpen(true);
                  }}
                  className="inline-flex items-center gap-1 px-3 py-2 text-indigo-600 border border-indigo-200 rounded-lg hover:bg-indigo-50 font-semibold text-xs active:scale-95"
                >
                  <MessageSquare className="w-4 h-4" />
                  Messages
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
      <TicketComments
        ticketId={commentOpen ? commentTicket?.id : null}
        open={commentOpen}
        onClose={() => {
          setCommentOpen(false);
          setCommentTicket(null);
        }}
      />
    </div>
  );
}
