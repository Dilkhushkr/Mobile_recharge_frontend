import React, { useState } from "react";
import { motion } from "framer-motion";
import { useDispatch } from "react-redux";
import { creatingBookingRequest } from "../redux/slices/createBookingSlice";

const Dashboard: React.FC = () => {
  const cars = [
    {
      id: 1,
      name: "Swift Desire",
      image: "https://www.elightcabs.com/wp-content/uploads/2021/06/swift-automatic-rent-a-car-in-trivandrum.jpg",
    },
    {
      id: 2,
      name: "Hyundai i20",
      image: "https://stimg.cardekho.com/images/carexteriorimages/930x620/Hyundai/i20-N-Line/10285/1755864612287/front-left-side-47.jpg",
    },
    {
      id: 3,
      name: "Hyundai Verna",
      image: "https://img.autocarindia.com/mmv_images/colors/20250826012232_Hyundai_Verna_Atlas%20White_Dual_Tone.jpg?w=728&q=75",
    },
    {
      id: 4,
      name: "Ertiga ",
      image: "https://htcms-prod-images.s3.ap-south-1.amazonaws.com/htmobile1/marutisuzuki_ertiga/images/colour_marutisuzuki-ertiga_pearl-metallic-arctic-white_600x400.jpg",
    },
    {
      id: 5,
      name: "scorpio",
      image: "https://auto.economictimes.indiatimes.com/files/retail_files/scorpio-1504269094-prod-var.jpg",
    },
    {
      id: 6,
      name: "Book any car",
      image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSBu3xbv2JsrWIf1EZNMfIEEzbQLcUvuSsZjQ&s",
    },
  ];

  const dispatch = useDispatch<any>();
  
  const [selectedCar, setSelectedCar] = useState<{
    id: number;
    name: string;
    image: string;
  } | null>(null);
  const [formData, setFormData] = useState({
    name: "",
    phone: "",
    start: "",
    end: "",
    bookingDate: ""
  });



  console.log("from data is :",formData)

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (!selectedCar) {
      // nothing selected, don't submit
      console.warn("No car selected for booking");
      return;
    }

    dispatch(
      creatingBookingRequest({
        name: formData.name,
        phone: formData.phone,
        startingLocation: formData.start,
        endLocation: formData.end,
        date: formData.bookingDate,
      })
    );

    alert(`Booking Confirmed for ${selectedCar.name}!`);
    setSelectedCar(null);
    setFormData({ name: "", phone: "", start: "", end: "", bookingDate: "" });

    console.log("submitted data is :", formData);
  };


   const handleLogout = async () => {
    await fetch("https://mobile-recharge-backend-11.onrender.com/api/auth/logout", {
      method: "POST",
      credentials: "include",
    });
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-gray-800 to-black text-white p-8">
      <div className="fixed top-4 right-4 z-50">
        <button
      className="px-6 py-2 bg-yellow-500 hover:bg-yellow-600 text-black font-semibold rounded-full shadow-lg transition-transform transform hover:scale-105 active:scale-95"
    >
      Logout
    </button>
      </div>
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
                  onClick={() => {
                    setSelectedCar(car);
                    setFormData((prev) => ({ ...prev, name: car.name }));
                  }}
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
                  onClick={() => {
                    setSelectedCar(null);
                    setFormData((prev) => ({ ...prev, name: "" }));
                  }}
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

export default Dashboard;