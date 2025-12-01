import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { userTicketAPI } from "../../utils/api";
import { toast } from "../../utils/toast";

const CreateTicket = () => {
  const [formData, setFormData] = useState({
    title: "",
    message: "",
  });
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      const response = await userTicketAPI.createTicket(formData);
      toast.success("Ticket created successfully!");

      setTimeout(() => {
        navigate(`/tickets/${response.data.data.id}`);
      }, 500);
    } catch (error) {
      toast.error(error.response?.data?.message || "Failed to create ticket");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="max-w-2xl mx-auto">
        <h1 className="text-3xl font-bold mb-6">Create New Ticket</h1>

        <form
          onSubmit={handleSubmit}
          className="bg-white rounded-xl shadow p-6 space-y-5"
        >
          {/* Title */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Title
            </label>
            <input
              type="text"
              name="title"
              value={formData.title}
              onChange={handleChange}
              required
              placeholder="Your issue"
              className="w-full rounded-lg border border-gray-300 px-3 py-2 text-sm 
                         focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
            />
          </div>

          {/* Message */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Message
            </label>
            <textarea
              name="message"
              value={formData.message}
              onChange={handleChange}
              rows="8"
              required
              placeholder="Provide detailed information about your issue..."
              className="w-full rounded-lg border border-gray-300 px-3 py-2 text-sm 
                         focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
            />
          </div>

          {/* Buttons */}
          <div className="flex gap-3">
            <button
              type="submit"
              disabled={loading}
              className="flex-1 bg-blue-600 text-white font-medium py-2 rounded-lg 
                         hover:bg-blue-700 active:bg-blue-800 disabled:opacity-50 transition"
            >
              {loading ? "Creating..." : "Create Ticket"}
            </button>

            <button
              type="button"
              onClick={() => navigate("/tickets")}
              className="px-4 py-2 rounded-lg border border-gray-300 text-gray-700 
                         hover:bg-gray-100 active:bg-gray-200 transition"
            >
              Cancel
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default CreateTicket;
