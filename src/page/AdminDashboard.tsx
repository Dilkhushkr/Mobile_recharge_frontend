// src/pages/AdminDashboard.jsx
import { useEffect, useState } from "react";
import BookingTable from "../components/BookingTable";
import { fetchBooking, deleteBooking } from "../redux/services/authService";
import { socket } from "../socket";

function AdminDashboard() {
  const [bookings, setBookings] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  // Fetch initial bookings
  const loadBookings = async () => {
    try {
      setLoading(true);
      const data = await fetchBooking();
      console.log("Fetched bookings:", data);
      setBookings(data.data);
    } catch (error) {
      console.error("Error loading data:", error);
    } finally {
      setLoading(false);
    }
  };

  // Delete booking
  const handleDelete = async (id: string) => {
    try {
      console.log("Deleting booking with id:", id);
      const deleteData = await deleteBooking(id);
      console.log("Delete response:", deleteData);
      setBookings((prev) => prev.filter((b) => b._id !== id));
    } catch {
      alert("Failed to delete booking");
    }
  };

  // Real-time socket updates
  useEffect(() => {
    loadBookings();

    // Listen for new bookings
    socket.on("new_booking", (newBooking) => {

      setBookings((prev) => [newBooking, ...prev]);

    });

    return () => {
      socket.off("new_booking");
    };
  }, []);

  return (
    <div className="min-h-screen bg-gray-100 p-8">
      <h1 className="text-3xl font-semibold mb-6 text-gray-800">
        Admin Dashboard
      </h1>

      {loading ? (
        <p className="text-gray-600 font-medium">Loading...</p>
      ) : (
        <BookingTable bookings={bookings} onDelete={handleDelete} />
      )}
    </div>
  );
}

export default AdminDashboard;
