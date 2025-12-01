import { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { adminTicketAPI } from "../../utils/api";
import { toast } from "../../utils/toast";

const AdminTicketDetail = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [ticket, setTicket] = useState(null);
  const [loading, setLoading] = useState(true);
  const [updating, setUpdating] = useState(false);

  useEffect(() => {
    fetchTicket();
  }, [id]);

  const fetchTicket = async () => {
    try {
      const response = await adminTicketAPI.getTicketById(id);
      setTicket(response.data.data);
    } catch (error) {
      console.log(error);

      toast.error("Failed to fetch ticket details");
      navigate("/admin/tickets");
    } finally {
      setLoading(false);
    }
  };

  const handleStatusUpdate = async (newStatus) => {
    setUpdating(true);
    try {
      await adminTicketAPI.updateStatus(id, newStatus);
      toast.success("Status updated successfully");
      fetchTicket();
    } catch (error) {
      console.log(error);
      toast.error("Failed to update status");
    } finally {
      setUpdating(false);
    }
  };

  const getStatusBadge = (status) => {
    const base = "px-3 py-1 rounded-full text-xs font-medium";

    const statusMap = {
      pending: `${base} bg-yellow-100 text-yellow-700`,
      in_progress: `${base} bg-blue-100 text-blue-700`,
      resolved: `${base} bg-green-100 text-green-700`,
      closed: `${base} bg-gray-200 text-gray-700`,
    };

    return statusMap[status] || `${base} bg-yellow-100 text-yellow-700`;
  };

  const formatStatus = (status) => {
    return status.replace("_", " ").toUpperCase();
  };

  if (loading) {
    return (
      <div className="container mx-auto px-4 py-8">
        <div className="flex justify-center items-center h-64">
          <div className="text-gray-600">Loading ticket...</div>
        </div>
      </div>
    );
  }

  if (!ticket) {
    return null;
  }

  const statusOptions = ["pending", "in_progress", "resolved", "closed"];

  return (
    <div className="container mx-auto px-4 py-8">
      <button
        onClick={() => navigate("/admin/tickets")}
        className="btn-secondary mb-4"
      >
        ← Back to Dashboard
      </button>

      <div className="max-w-4xl mx-auto space-y-6">
        {/* Ticket Details */}
        <div className="card">
          <div className="flex justify-between items-start mb-4">
            <div>
              <h1 className="text-2xl font-bold mb-2">{ticket.title}</h1>
              <p className="text-gray-600">
                Ticket #{ticket.id} • User ID: {ticket.user_id}
              </p>
            </div>
            <span className={`badge ${getStatusBadge(ticket.status)}`}>
              {formatStatus(ticket.status)}
            </span>
          </div>

          <div className="border-t pt-4 mb-4">
            <p className="text-gray-700 whitespace-pre-wrap">
              {ticket.message}
            </p>
          </div>

          {/* Status Update Section */}
          <div className="border-t pt-4">
            <h3 className="font-semibold mb-3">Update Status</h3>
            <div className="flex flex-wrap gap-2">
              {statusOptions.map((status) => (
                <button
                  key={status}
                  onClick={() => handleStatusUpdate(status)}
                  disabled={updating || ticket.status === status}
                  className={`px-4 py-2 rounded-lg text-sm font-medium transition 
    ${
      ticket.status === status
        ? "bg-gray-200 text-gray-500 cursor-not-allowed"
        : "bg-blue-600 text-white hover:bg-blue-700 active:bg-blue-800"
    }
  `}
                >
                  {formatStatus(status)}
                </button>
              ))}
            </div>
          </div>
        </div>

        {/* Comments Section */}
        <div className="card">
          <h2 className="text-xl font-bold mb-4">
            Comments ({ticket.comments?.length || 0})
          </h2>

          {ticket.comments && ticket.comments.length > 0 ? (
            <div className="space-y-4">
              {ticket.comments.map((comment) => (
                <div key={comment.id} className="bg-gray-50 rounded-lg p-4">
                  <p className="text-gray-700">{comment.message}</p>
                  <p className="text-sm text-gray-500 mt-2">
                    User #{comment.user_id}
                  </p>
                </div>
              ))}
            </div>
          ) : (
            <p className="text-gray-500">No comments yet</p>
          )}
        </div>
      </div>
    </div>
  );
};

export default AdminTicketDetail;
