import { Link } from "react-router-dom";

const TicketCard = ({ ticket, isAdmin = false }) => {
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

  const linkTo = isAdmin
    ? `/admin/tickets/${ticket.id}`
    : `/tickets/${ticket.id}`;

  return (
    <Link
      to={linkTo}
      className="card hover:shadow-lg transition-shadow px-3 py-4 rounded-xl"
    >
      <div className="flex justify-between items-start mb-2">
        <h3 className="text-lg font-semibold text-gray-800">{ticket.title}</h3>
        <span className={`badge ${getStatusBadge(ticket.status)}`}>
          {formatStatus(ticket.status)}
        </span>
      </div>

      <p className="text-gray-600 mb-3 line-clamp-2">{ticket.message}</p>

      <div className="flex items-center justify-between text-sm text-gray-500">
        <span>Ticket #{ticket.id}</span>
        {ticket.comments && <span>{ticket.comments.length} comment(s)</span>}
      </div>
    </Link>
  );
};

export default TicketCard;
