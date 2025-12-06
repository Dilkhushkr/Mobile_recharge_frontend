// src/components/BookingTable.jsx
/* eslint-disable react/prop-types */
interface BookingTableProps {
  bookings: Array<{ _id: string; name: string; phone: string; startingLocation: string; endLocation: string; date: string }>;
  onDelete: (id: string) => void;
}

// Helper function to format date
const formatDate = (dateString: string): string => {
  try {
    const date = new Date(dateString);
    if (isNaN(date.getTime())) {
      return dateString; // Return original if invalid
    }
    return date.toLocaleDateString("en-IN", {
      year: "numeric",
      month: "short",
      day: "2-digit"
    });
  } catch {
    return dateString;
  }
};

// Helper function to format phone
const formatPhone = (phone: string): string => {
  if (!phone) return "N/A";
  return phone.replace(/(\d{10})/, "+91 $1").slice(0, 20);
};

function BookingTable({ bookings, onDelete }: BookingTableProps) {
  return (
    <div className="overflow-x-auto">
      <table className="min-w-full bg-white shadow-lg rounded-lg overflow-hidden">
        <thead className="bg-gray-800 text-white">
          <tr>
            <th className="py-3 px-5 text-left">Name</th>
            <th className="py-3 px-5 text-left">Phone</th>
            <th className="py-3 px-5 text-left">Starting Location</th>
            <th className="py-3 px-5 text-left">End Location</th>
            <th className="py-3 px-5 text-left">Date</th>
            <th className="py-3 px-5 text-left">Action</th>
          </tr>
        </thead>

        <tbody>
          {bookings.map((b) => (
            <tr key={b._id} className="border-b hover:bg-gray-100 transition-colors">
              <td className="py-3 px-5 font-medium text-gray-900">{b.name || "N/A"}</td>
              <td className="py-3 px-5 text-gray-700">{formatPhone(b.phone)}</td>
              <td className="py-3 px-5 text-gray-700">{b.startingLocation || "N/A"}</td>
              <td className="py-3 px-5 text-gray-700">{b.endLocation || "N/A"}</td>
              <td className="py-3 px-5 text-gray-600 font-medium">{formatDate(b.date)}</td>

              <td className="py-3 px-5">
                <button
                  onClick={() => onDelete(b._id)}
                  className="bg-red-500 text-white px-4 py-2 rounded hover:bg-red-600 transition-colors text-sm font-semibold"
                >
                  Delete
                </button>
              </td>
            </tr>
          ))}

          {bookings.length === 0 && (
            <tr>
              <td
                colSpan={6}
                className="text-center py-6 text-gray-500 font-semibold"
              >
                No bookings found
              </td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  );
}

export default BookingTable;
