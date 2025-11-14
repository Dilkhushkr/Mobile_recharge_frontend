import React, { useState } from "react";
import { motion } from "framer-motion";

export default function Dashboard() {
  const cars = [
    {
      id: 1,
      name: "Swift Desire",
      image: "https://images.pexels.com/photos/210019/pexels-photo-210019.jpeg",
    },
    {
      id: 2,
      name: "Hyundai i20",
      image: "https://images.pexels.com/photos/358070/pexels-photo-358070.jpeg",
    },
    {
      id: 3,
      name: "Honda City",
      image: "https://images.pexels.com/photos/358070/pexels-photo-358070.jpeg",
    },
    {
      id: 4,
      name: "Tata Nexon",
      image: "https://images.pexels.com/photos/358070/pexels-photo-358070.jpeg",
    },
    {
      id: 5,
      name: "Toyota Fortuner",
      image: "https://images.pexels.com/photos/1149831/pexels-photo-1149831.jpeg",
    },
    {
      id: 6,
      name: "Maruti Baleno",
      image: "https://images.pexels.com/photos/358070/pexels-photo-358070.jpeg",
    },
  ];

  const [selectedCar, setSelectedCar] = useState(null);
  const [formData, setFormData] = useState({
    name: "",
    phone: "",
    start: "",
    end: "",
    bookingDate: ""
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    alert(`Booking Confirmed for ${selectedCar.name}!`);
    setSelectedCar(null);
    setFormData({ name: "", phone: "", start: "", end: "" ,bookingDate: ""});
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-gray-800 to-black text-white p-8">
      <motion.h1
        className="text-4xl font-bold text-center mb-10"
        initial={{ opacity: 0, y: -30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
      >
        🚗 Car Rental Dashboard
      </motion.h1>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
        {cars.map((car, index) => (
          <motion.div
            key={car.id}
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.2 }}
          >
            <div className="bg-gray-800 text-white shadow-lg rounded-2xl overflow-hidden hover:scale-105 transition-transform duration-300">
              <img
                src={car.image}
                alt={car.name}
                className="h-48 w-full object-cover"
              />
              <div className="p-5 flex flex-col items-center">
                <h2 className="text-xl font-semibold mb-3 flex items-center gap-2">
                  {car.name}
                </h2>
                <button
                  onClick={() => setSelectedCar(car)}
                  className="bg-yellow-500 hover:bg-yellow-600 text-black font-semibold rounded-full px-6 py-2 transition-all"
                >
                  Book Now
                </button>
              </div>
            </div>
          </motion.div>
        ))}
      </div>

      {selectedCar && (
        <div className="fixed inset-0 bg-black bg-opacity-70 flex justify-center items-center z-50">
          <motion.div
            initial={{ scale: 0.8, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ duration: 0.4 }}
            className="bg-gray-900 p-8 rounded-2xl w-full max-w-md shadow-2xl border border-yellow-500"
          >
            <h2 className="text-2xl font-bold mb-6 text-center text-yellow-400">
              Book {selectedCar.name}
            </h2>

            <form onSubmit={handleSubmit} className="flex flex-col gap-4">
              <input
                type="text"
                name="name"
                value={formData.name}
                onChange={handleChange}
                placeholder="Enter your name"
                required
                className="p-3 rounded-lg bg-gray-800 text-white border border-gray-600 focus:border-yellow-500 outline-none"
              />

              <input
                type="tel"
                name="phone"
                value={formData.phone}
                onChange={handleChange}
                placeholder="Enter your phone number"
                required
                className="p-3 rounded-lg bg-gray-800 text-white border border-gray-600 focus:border-yellow-500 outline-none"
              />

              <input
                type="text"
                name="start"
                value={formData.start}
                onChange={handleChange}
                placeholder="Starting location"
                required
                className="p-3 rounded-lg bg-gray-800 text-white border border-gray-600 focus:border-yellow-500 outline-none"
              />

              <input
                type="text"
                name="end"
                value={formData.end}
                onChange={handleChange}
                placeholder="Ending location"
                required
                className="p-3 rounded-lg bg-gray-800 text-white border border-gray-600 focus:border-yellow-500 outline-none"
              />

              <input
                  type="date"
                  name="bookingDate"
                  value={formData.bookingDate}
                  onChange={handleChange}
                  required
                  className="p-3 rounded-lg bg-gray-800 text-white border border-gray-600 focus:border-yellow-500 outline-none"
              />

              <div className="flex justify-between mt-4">
                <button
                  type="button"
                  onClick={() => setSelectedCar(null)}
                  className="bg-gray-700 hover:bg-gray-600 text-white font-semibold rounded-full px-6 py-2"
                >
                  Cancel
                </button>

                <button
                  type="submit"
                  className="bg-yellow-500 hover:bg-yellow-600 text-black font-semibold rounded-full px-6 py-2"
                >
                  Submit
                </button>
              </div>
            </form>
          </motion.div>
        </div>
      )}
    </div>
  );
}