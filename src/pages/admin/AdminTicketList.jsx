import { useState, useEffect } from "react";
import { adminTicketAPI } from "../../utils/api";
import { toast } from "../../utils/toast";
import TicketCard from "../../components/TicketCard";

const AdminTicketList = () => {
  const [tickets, setTickets] = useState([]);
  const [loading, setLoading] = useState(true);
  const [filter, setFilter] = useState("all");

  const fetchTickets = async () => {
    try {
      const response = await adminTicketAPI.getAllTickets();
      setTickets(response.data.data);
    } catch (error) {
      console.log(error);

      toast.error("Failed to fetch tickets");
    } finally {
      setLoading(false);
    }
  };
  useEffect(() => {
    fetchTickets();
  }, []);

  const filteredTickets = tickets.filter((ticket) => {
    if (filter === "all") return true;
    return ticket.status === filter;
  });

  const getStatusCount = (status) => {
    return tickets.filter((t) => t.status === status).length;
  };

  if (loading) {
    return (
      <div className="container mx-auto px-4 py-8">
        <div className="flex justify-center items-center h-64">
          <div className="text-gray-600">Loading tickets...</div>
        </div>
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-6">Admin Dashboard</h1>

      {/* Stats */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-6">
        <div className="p-5 rounded-xl  bg-white shadow-sm">
          <p className="text-gray-500 text-sm">Total Tickets</p>
          <p className="text-3xl font-extrabold text-gray-800">
            {tickets.length}
          </p>
        </div>

        <div className="p-5 rounded-xl  bg-white shadow-sm">
          <p className="text-gray-500 text-sm">Pending</p>
          <p className="text-3xl font-extrabold text-yellow-500">
            {getStatusCount("pending")}
          </p>
        </div>

        <div className="p-5 rounded-xl  bg-white shadow-sm">
          <p className="text-gray-500 text-sm">In Progress</p>
          <p className="text-3xl font-extrabold text-blue-500">
            {getStatusCount("in_progress")}
          </p>
        </div>

        <div className="p-5 rounded-xl  bg-white shadow-sm">
          <p className="text-gray-500 text-sm">Resolved</p>
          <p className="text-3xl font-extrabold text-green-500">
            {getStatusCount("resolved")}
          </p>
        </div>
      </div>

      {/* Filters */}
      <div className="flex gap-2 mb-6">
        {["all", "pending", "in_progress", "resolved", "closed"].map(
          (status) => (
            <button
              key={status}
              onClick={() => setFilter(status)}
              className={`px-4 py-2 rounded-lg transition-colors cursor-pointer ${
                filter === status
                  ? "bg-blue-500 text-white  hover:bg-blue-600"
                  : "bg-gray-200 text-gray-700 hover:bg-gray-300"
              }`}
            >
              {status === "all"
                ? "All"
                : status.replace("_", " ").toUpperCase()}
            </button>
          )
        )}
      </div>

      {/* Tickets Grid */}
      {filteredTickets.length === 0 ? (
        <div className="card text-center py-12">
          <p className="text-gray-600">No tickets found</p>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {filteredTickets.map((ticket) => (
            <TicketCard key={ticket.id} ticket={ticket} isAdmin={true} />
          ))}
        </div>
      )}
    </div>
  );
};

export default AdminTicketList;
