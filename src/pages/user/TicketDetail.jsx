import { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { userTicketAPI } from "../../utils/api";
import { toast } from "../../utils/toast";

const TicketDetail = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [ticket, setTicket] = useState(null);
  const [loading, setLoading] = useState(true);
  const [commentText, setCommentText] = useState("");
  const [submitting, setSubmitting] = useState(false);
  const [deletingComment, setDeletingComment] = useState(false);
  useEffect(() => {
    fetchTicket();
  }, [id]);

  const fetchTicket = async () => {
    try {
      const response = await userTicketAPI.getTicketById(id);
      setTicket(response.data.data);
    } catch (error) {
      console.log(error);

      toast.error("Failed to fetch ticket details");
      navigate("/tickets");
    } finally {
      setLoading(false);
    }
  };

  const handleAddComment = async (e) => {
    e.preventDefault();
    if (!commentText.trim()) return;

    setSubmitting(true);
    try {
      await userTicketAPI.addComment(id, commentText);
      toast.success("Comment added successfully");
      setCommentText("");
      fetchTicket();
    } catch (error) {
      console.log(error);

      toast.error("Failed to add comment");
    } finally {
      setSubmitting(false);
    }
  };

  const handleDeleteComment = async (commentId) => {
    try {
      console.log("Deleting comment:", commentId);
      setDeletingComment(true);
      await userTicketAPI.deleteComment(commentId);
      toast.success("Comment deleted successfully");
      fetchTicket();
    } catch (error) {
      console.log(error);
    } finally {
      setDeletingComment(false);
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

  return (
    <div className="container mx-auto px-4 py-8">
      <button
        onClick={() => navigate("/tickets")}
        className="btn-secondary mb-4"
      >
        ← Back to Tickets
      </button>

      <div className="max-w-4xl mx-auto space-y-6">
        {/* Ticket Details */}
        <div className="card">
          <div className="flex justify-between items-start mb-4">
            <div>
              <h1 className="text-2xl font-bold mb-2">{ticket.title}</h1>
              <p className="text-gray-600">Ticket #{ticket.id}</p>
            </div>
            <span className={`badge ${getStatusBadge(ticket.status)}`}>
              {formatStatus(ticket.status)}
            </span>
          </div>

          <div className="border-t pt-4">
            <p className="text-gray-700 whitespace-pre-wrap">
              {ticket.message}
            </p>
          </div>
        </div>

        {/* Comments Section */}
        <div className="bg-white rounded-xl shadow p-6">
          <h2 className="text-xl font-bold mb-4">
            Comments ({ticket.comments?.length || 0})
          </h2>

          {/* List Comments */}
          {ticket.comments && ticket.comments.length > 0 && (
            <div className="space-y-4 mb-6">
              {ticket.comments.map((comment) => (
                <div
                  key={comment.id}
                  className="bg-gray-50 rounded-lg p-4 flex justify-between items-start"
                >
                  <div className="flex flex-col">
                    <p className="text-gray-800">{comment.message}</p>
                    <p className="text-sm text-gray-500 mt-2">
                      User #{comment.user_id}
                    </p>
                  </div>
                  <button
                    onClick={() => handleDeleteComment(comment.id)}
                    disabled={deletingComment}
                    className="text-red-600 hover:underline text-sm disabled:opacity-50 cursor-pointer"
                  >
                    {deletingComment ? "Deleting..." : "Delete"}
                  </button>
                </div>
              ))}
            </div>
          )}

          {/* Add Comment Form */}
          <form onSubmit={handleAddComment} className="space-y-3">
            <textarea
              value={commentText}
              onChange={(e) => setCommentText(e.target.value)}
              rows="3"
              required
              placeholder="Add a comment..."
              className="w-full rounded-lg border border-gray-300 px-3 py-2 text-sm
                 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
            />

            <button
              type="submit"
              disabled={submitting || !commentText.trim()}
              className="bg-blue-600 text-white font-medium px-4 py-2 rounded-lg 
                 hover:bg-blue-700 active:bg-blue-800 disabled:opacity-50 transition"
            >
              {submitting ? "Adding..." : "Add Comment"}
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default TicketDetail;
