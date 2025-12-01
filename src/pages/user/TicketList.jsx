import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { userTicketAPI } from "../../utils/api";
import { toast } from "../../utils/toast";
import TicketCard from "../../components/TicketCard";

const TicketList = () => {
  const [tickets, setTickets] = useState([]);
  const [loading, setLoading] = useState(true);

  const fetchTickets = async () => {
    try {
      const response = await userTicketAPI.getMyTickets();
      setTickets(response.data.data);
    } catch (error) {
      console.error(error);
      toast.error("Failed to fetch tickets");
    } finally {
      setLoading(false);
    }
  };
  useEffect(() => {
    fetchTickets();
  }, []);
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
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-3xl font-bold">My Tickets</h1>
        <Link to="/tickets/create" className="btn-primary">
          Create New Ticket
        </Link>
      </div>

      {tickets.length === 0 ? (
        <div className="card text-center py-12">
          <p className="text-gray-600 mb-4">
            You haven't created any tickets yet.
          </p>
          <Link
            to="/tickets/create"
            className="px-4 py-2 rounded-lg text-sm font-medium transition bg-blue-600 text-white hover:bg-blue-700 active:bg-blue-800"
          >
            Create Your First Ticket
          </Link>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {tickets.map((ticket) => (
            <TicketCard key={ticket.id} ticket={ticket} />
          ))}
        </div>
      )}
    </div>
  );
};

export default TicketList;
